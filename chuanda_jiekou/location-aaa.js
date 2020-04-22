#!/usr/bin/node

const http = require('http');
const fs = require('fs');
var optfile = require('./fs_read');
var qs=require('querystring');

//连接数据库
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'ddd',
        database: 'clothes'
      });
con.connect();
let server = http.createServer();

//先假定用户id为111
var user = '122';
var obj='';
server.on('request',(req,res)=>{//获得用户id
    if(req.url==='/aa'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        req.on('data',function(data){
            user=JSON.parse(data).userId
        })
        res.end();
    }
    //获取天气预报
    let promise = new Promise(resolve =>{
        //查询数据库数据获得用户信息
        con.query(`select * from users,clothing where clothing.userId = users.userId and users.userId=${user}`, (err, result) => {
            if(result==''){
                var oo={};
                con.query(`select * from users where users.userId=${user}`, (err, result) => {
                    oo.userId = result[0].userId
                    oo.userCity = result[0].userCity;
                    var arr = new Array();
                    arr.push(oo)
                    // console.log(arr);
                    resolve(arr)
                })
            }else{
                // console.log('yes')
                resolve(result)
            }
        })
    })
        .then(value =>{
            return new Promise(resolve =>{
                // console.log(value)
                var addr = 'http://www.tianqiapi.com/api/?version=v1&city='+value[0].userCity+'&appid=24444633&appsecret=cgkFXVq9'
                http.get(global.encodeURI(addr), (res) => {
                    var obj='';
                    res.on('data', (data) => {
                        obj+=data;
                    });
                    res.on('end',()=>{
                        var arr=[...value,JSON.parse(obj)];//前面的信息+天气
                        resolve(arr)
                    })
                })
            })
        })
        .then(value =>{
                //创建服务
                var l = value.length;
                var w = l-1;
                    //读取图片信息
                    if(req.url.split('/')[1] === 'images') {
                        var photo = req.url.split('/')[2];
                        console.log(photo);
                        console.log(req.url)
                        optfile.readImg('../我的/images/'+photo, res);
                    }
                    // 发送信息
                    if(req.url==='/react'){
                        console.log('我发送了')
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.end(JSON.stringify(value));
                    }
                    if(req.url==='/pp'){
                        req.on('data',function(data){
                            obj=data;
                        })
                    }
                    if(req.url==='/pp2'){
                        console.log('发送给整理箱了'+obj)
                        res.setHeader("Access-Control-Allow-Credentials",true)
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        if(obj){
                            res.end(obj);
                        }else{
                            res.end(JSON.stringify([]))
                        }
                    }
        })
})

    function unique(arr){            
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].cloSmallPic){
                    if(arr[i].cloSmallPic==arr[j].cloSmallPic){  
                        arr.splice(j,1);
                        j--;
                    }
                }
            }
        }
    return arr;
    }
    server.listen(8083);