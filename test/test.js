var assert = require("assert")
var API    = require("../API.js")

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
