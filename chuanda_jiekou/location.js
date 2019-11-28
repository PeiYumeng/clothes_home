#!/usr/bin/node

const http = require('http');
//连接数据库
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: 'http://www.zhangpeiligao.top',
        user: 'root',
        password: 'ddd',
        database: 'clothes'
      });
con.connect();
//设置城市
var city='石家庄',resultaaa='';

let promise = new Promise(resolve =>{
    //查询数据库数据获得用户城市
    con.query('select * from citys', (err, result) => {
        if(result[0].title==='chengdu'){
            resolve(city='成都')
        }
        else{
           resolve(city='石家庄');
        }
    }); 
})
    .then(value =>{
        console.log(value);
        return new Promise(resolve =>{
            var addr = 'http://v.juhe.cn/weather/index?cityname=' + value + '&key=8a243fddebdd1ff372d8cd0678862674';
            http.get(global.encodeURI(addr), (res) => {
                res.on('data', (data) => {
                    resolve(resultaaa += data.toString('utf8'))
                });
            })
        })
    })
    .then(value =>{
            //创建服务
            console.log(value)
            http.createServer((req,res)=>{ 
                if(req.url==='/weather'){
                    res.setHeader("Access-Control-Allow-Origin", "*"); 
                    res.end(value);        
                }
            }).listen(8080)
    })