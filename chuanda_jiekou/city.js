#!/usr/bin/node
//连接
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ddd',
        database: 'test'
      });
con.connect();
//查询
con.query('select * from citys', (err, result) => {
    if(err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(result);
    console.log(result[0]);
    console.log(result[0].title);
  });
  con.end();
