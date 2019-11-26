#!/usr/bin/node

const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ddd',
        database: 'test'
      });
con.connect();
con.query('select * from city', (err, result) => {
    if(err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(result);
  });
  con.end();