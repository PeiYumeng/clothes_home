#!/usr/bin/node

const http = require('http');

var city = process.argv[2] || '石家庄';  //设置默认城市石家庄
var addr = 'http://v.juhe.cn/weather/index?cityname=' + city + '&key=70b20823f67b5f0ca3358b796fd83260';
//获取某市天气
var result='';
http.get(global.encodeURI(addr), (res) => {
    res.on('data', (data) => {
      result += data.toString('utf8');
    });
});
http.createServer((req,res)=>{
    if(req.url==='/weather'){
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        res.end(result);
    }
}).listen(8080)
