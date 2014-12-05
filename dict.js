var fs = require('fs');
var util = require('util');

fs.readFile('../dics/stardict-oald-cn-2.4.2/oald_cn.idx','utf-8',function(err,data){
    if(err){
        return console.log(err);
    }
    var index = data.indexOf('\0');
    var word_data_offset = data[index+1];

    console.log(util.format("%d",word_data_offset));
    console.log(data.slice(0,index));
});
