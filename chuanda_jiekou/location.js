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
var city='石家庄',result='';
//查询数据库数据
con.query('select * from citys', (err, result) => {
    if(err) {
        console.error(err.message);
        process.exit(1);
    }
    if(result[0].title==='chengdu'){
        city='成都'
    }
    else{
        city='石家庄'
    }
    console.log(city)
    var addr = 'http://v.juhe.cn/weather/index?cityname=' + city + '&key=8a243fddebdd1ff372d8cd0678862674';
    http.get(global.encodeURI(addr), (res) => {
        res.on('data', (data) => {
            result += data.toString('utf8');
        });
    })
    console.log(result);
    //创建服务
    http.createServer((req,res)=>{
        if(req.url==='/weather'){
            res.setHeader("Access-Control-Allow-Origin", "*"); 
            res.end(result);        
        }
    }).listen(8080)
}); 


// con.end();