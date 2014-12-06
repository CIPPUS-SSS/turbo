var fs = require('fs');
var util = require('util');


Buffer.prototype.toNetworkOrder = function(size){ 

    var size = size?size:32;

    if(!(size == 32 || size == 64)) {
        var err = "only 32bit or 64bit allowed"
        throw err;
    }
    if(this.length != size/8){
        var err = "slice.length is not equal size!"
        throw err;
    }
    var num = 0;
    for(var i = 0 ;i < this.length;i++){
        num += this[i]<<(size-8*(i+1));
    }
    return num;
};

var wordDatas = [];
fs.readFile('./dics/stardict-oald-cn-2.4.2/oald_cn.idx',function(err,data){
    //4*8 = 32bit,default offset
    var OF = 4;
    //4*8 = 32bit,word data size
    var WS = 4;
    if(err){
        return console.log(err);
    }
    var index = 0;
    var tail = 0;
    for(var i = 0;i<100; i++){
        if(data[i] == 0x00){
            index = i;
            console.log("index",index);
            var word = data.slice(tail,index);
            var wordOffset = data.slice(index+1,index+5);
            var wordSize = data.slice(index+5,index+9);
            wordDatas.push({
                word:word,
                offset:wordOffset,
                dataSize:wordSize
            });
            console.log(wordOffset.toNetworkOrder());
            console.log(wordSize.toNetworkOrder());
            console.log(word.toString('utf-8',0,word.length));
            tail = index + OF + WS + 1;
            console.log("tail",tail);
            i += OF + WS;
        }
    }
    /* console.log(index); var word = data.slice(0,index); var offset = data.slice(index+1,index+5); console.log(offset); console.log(offset.toNetworkOrder()); console.log(word.toString('utf-8',0,word.length)); */ //var index = data.IndexOf('\0');
    //console.log(index);
    //var word_data_offset = data[index+1];

    //console.log(util.format("%d",word_data_offset));
    //console.log(data.slice(0,index));
});

