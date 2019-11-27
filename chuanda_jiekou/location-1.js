#!/usr/bin/node
const http = require('http');

var city = process.argv[2] || '石家庄';
var addr = 'http://v.juhe.cn/weather/index?cityname=' + city + '&key=70b20823f67b5f0ca3358b796fd83260';
var result='';
http.get(global.encodeURI(addr), (res) => {    //这是用node写的客户端方法
    res.on('data', (data) => {
      result += data.toString('utf8');
    });
});
http.createServer((req,res)=>{     //node服务器端
    if(req.url==='/weather'){
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        console.log(result);
        res.end(result);
    }
}).listen(8080)
