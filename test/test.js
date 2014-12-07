var assert = require("assert")
var API    = require("../API.js")
var dict   = require("../dict.js")

describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
})
describe('API',function(){
    describe('#apiGet()',function(){
        it('should return traslation result with errorCode 0',function(){
            API.get('hello',function(result){
                assert.equal(0,result.errorCode);
            });
        });
    });
});
var bufs = [{
    input:new Buffer([0,0,0,3]),
    output:3
},
{
    input:new Buffer([0,0,1,1]),
    output:257
}
];

describe('Buffer',function(){
    describe('#toNetworkOrder',function(){
        it('should return big-end number',function(){
            for(var i = 0; i < bufs.length;i++){
                assert.equal(bufs[i].output,bufs[i].input.toNetworkOrder());
            }
        });
    });
});

describe('dict',function(){
    process.chdir('..');
    /*
    describe('#query',function(){
        it('should return result -> = halo. ',function(done){
            dict.query('hello',function(err,date){
                if(err) throw err;
                assert.equal(data=='= hallo.'); 
            }); 
        });
    });
   */
    describe('#query Count',function(){
        it('callback should run once',function(done){
            dict.query('mike',function(err,data){
                if(err)throw err;
                console.log(data);
            });
        });
    });
});
