var request = require('request');
/*
 * 有道翻译API申请成功
 * API key：720242206
 * keyfrom：asd123b
 * 创建时间：2014-05-09
 * 网站名称：asd123b
 * 网站地址：http://golangt.com
 * 
 */
var ERRORS  = {
    0:"正常",
    10:"文本不能为空",
    20:"要翻译的文本过长",
    30:"无法进行有效翻译",
    40:"不支持的语言类型",
    50:"无效的key",
    60:"无词典结果,仅在获取词典结果生效",
    70:"请求错误"
}


const APIKEY = 720242206
const URLTEMPLATE = "http://fanyi.youdao.com/openapi.do?keyfrom=asd123b&key=720242206&type=data&doctype=json&version=1.1&q="
var keyfrom = "turbo-dict"
var key = 1224097275

function get(query,cb){
    result = {};
    if(query =="" || query==" "){
        result.errorCode = 10;
        result.errorMsg = ERRORS[10];
        cb(null,null,result);
    }else{
        request({
            url:"http://fanyi.youdao.com/openapi.do",
            json:true,
            qs:{
                keyfrom:keyfrom,
                key:key,
                type:"data",
                doctype:"json",
                version:1.1,
                q:query
            }
        },function(err,res,body){
            var result = body;
            if(err){
                result.errorCode = 70;
                result.errorMsg = err;
            }else if(result.errorCode != 0){
                result.errorMsg = ERRORS[result.errorCode];
            }
            cb(result);
        });
    }
};

module.exports.get = get;


