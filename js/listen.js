var exec = require('child_process').exec;
var emitter = require('events').EventEmitter;

var gui = require('nw.gui');

var listener = new emitter();

var clipboard = gui.Clipboard.get();

listener.begin = function(){
    setInterval(function(){
            var text = clipboard.get('text');
            if(text.length > 0){
                listener.emit('word',text);
            }
            clipboard.clear();
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
