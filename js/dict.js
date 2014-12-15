var fs = require('fs');
var util = require('util');
var exec = require('child_process').exec;
var emitter = require('events').EventEmitter;


/*
 *  it's module is fo  start dict format parsing.
 *  more detailed format information,please see []()
 */

Buffer.prototype.toNetworkOrder = function(size){ 

    var size = size?size:32;

    if(!(size == 32 || size == 64)) {
        var err = "only 32bit or 64bit allowed"
        throw err;
    };
    if(this.length != size/8){
        var err = "slice.length is not equal size!"
        throw err;
    };
    var num = 0;
    for(var i = 0 ;i < this.length;i++){
        num += this[i]<<(size-8*(i+1));
    };
    return num;
};

var config = {};

var query = function(queryString,callback){
    var wordDatas = [];
    fs.readFile('resources/dics/stardict-oald-cn-2.4.2/oald_cn.ifo','utf-8',function(err,data){
        if (err) return callback(err);
        var lines = data.split('\n');
        var title = lines[0];
        if (!title || title != "StarDict's dict ifo file") {
            var err = "Format Error: .info file need title \"StarDict's dict ifo file\"";
            return callback(err);
        }
        var lines  = data.split('\n').slice(1);

        for(var i = 0;i<lines.length;i++){
            var line = lines[i].match(/[\s\S]*=[\s\S]*/);
//read .ifo file
if( line != null ){
    var pair = line.toString().split('=');
    key = pair[0];
    value = pair[1];
    config[key]=value;
}
        }
        //TODO:check idxoffsetbits in 3.0.0 and check synwordcount if .syn file exists
        ["bookname","wordcount","idxfilesize","sametypesequence"].forEach(function(index,ele){
            if(!config[ele]) return "need file information: "+ele;
        });
        fs.readFile('resources/dics/stardict-oald-cn-2.4.2/oald_cn.idx',function(err,data){
            if (err) return callback(err);
            //4*8 = 32bit,default offset
            var OF = 4;
            //4*8 = 32bit,word data size
            var WS = 4;
            var index = 0;
            var tail = 0;
            for(var i = 0;i<config.idxfilesize; i++){
                if(data[i] == 0x00){
                    index = i;
                    var word = data.slice(tail,index);
                    var wordOffset = data.slice(index+1,index+5);
                    var wordSize = data.slice(index+5,index+9);
                    wordDatas.push({
                        word:word.toString('utf-8',0,word.length),
                        offset:wordOffset.toNetworkOrder(config.idxoffsetbits),
                        dataSize:wordSize.toNetworkOrder(config.idxoffsetbits)
                    });
                    tail = index + OF + WS + 1;
                    i += OF + WS;
                };
            };
            for(var i = 0; i<wordDatas.length;i++){
            };
            for(var i = 0; i<wordDatas.length;i++){
                if(wordDatas[i].word == queryString){
                    var word = wordDatas[i];
                    fs.open('resources/dics/stardict-oald-cn-2.4.2/oald_cn.dict','r',function(err,fd){
                        if(err)
                            throw err;
                        var buf = new Buffer(word.dataSize);
                        fs.fstat(fd,function(err,stats){
                            if(err){
                                return fs.close(fd,function(){
                                    return callback(err);
                                });
                            }
                            fs.read(fd,buf,0,word.dataSize,word.offset,function(err,n,buf){
                                if(err){
                                    return fs.close(fd,function(err){
                                        return callback(err);
                                    });
                                }
                                return fs.close(fd,function(err){
                                    return callback(err,buf.toString('utf-8',0,buf.length));
                                });
                            });
                        });
                    });
                };
            };
        });
    });
};


var listener = new emitter();

var chache='';
listener.begin = function(){
    exec('echo "" | xclip -i',function(err,stdout,stderr){
        if(err){
            console.log(err);
        }else{
            setInterval(function(){
                child = exec('xclip -o',function(err,stdout,stderr){
                    if(err)console.log(err);
                    if(chache!=stdout){
                        chache=stdout;
                        listener.emit('word',stdout);
                    }
                });
            },1000);
        }
    });

};

listener.end = function(){
    this.removeAllListeners('word');
};


module.exports.listener  = listener;
module.exports.query = query;
