var exec = require('child_process').exec;
var emitter = require('events').EventEmitter;

var listener = new emitter();

listener.begin = function(){
    setInterval(function(){
        child = exec('xclip -o',function(err,stdout,stderr){
            if(err)console.log(err);
            listener.emit('word',stdout);
        });
    },1000);

};

listener.end = function(){
    this.removeAllListeners('word');
};

listener.begin();

listener.on('word',function(word){
    console.log(word);
});
exports.modules = listener;
