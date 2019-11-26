#!/usr/bin/node

const http = require('http');
//连接数据库
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ddd',
        database: 'test'
      });
con.connect();
//设置城市
var city,resultaaa='';

 

//创建服务
http.createServer((req,res)=>{
    if(req.url==='/weather'){
    //查询数据库数据
    con.query('select * from citys', (err, result) => {
        if(err) {
        console.error(err.message);
        process.exit(1);
        }
        console.log(result[0].title);
        if(result[0].title==='chengdu'){
            city='成都'
        }
        else{
            city='石家庄'
        }
    }); 
    var addr = 'http://v.juhe.cn/weather/index?cityname=' + city + '&key=70b20823f67b5f0ca3358b796fd83260';
    http.get(global.encodeURI(addr), (res) => {
        console.log(city)
        res.on('data', (data) => {
        resultaaa += data.toString('utf8');
        return resultaaa;
        });
    });
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.end(resultaaa);        
    }
}).listen(8080)
// con.end();