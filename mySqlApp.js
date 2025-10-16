var { faker } = require('@faker-js/faker');
var mysql = require('mysql2');
var express = require('express');
var bodyParser = require('body-parser');
//var ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
  console.log('Server started on port 3000');
});

app.get('/cookieTest', (_, res) => {
  const token = 'cookie test token';

  res.cookie('accessToken', token, {
    httpOnly: true, // prevents JavaScript access (XSS protection)
    secure: false, // ensures cookie is sent only over HTTPS (set false for local dev)
    sameSite: 'strict', // prevents CSRF
    maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  });

  res.cookie('accessToken2', token, {
    httpOnly: true, // prevents JavaScript access (XSS protection)
    secure: false, // ensures cookie is sent only over HTTPS (set false for local dev)
    sameSite: 'strict', // prevents CSRF
    maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  });

  res.cookie('accessToken3', token, {
    //httpOnly: true, // prevents JavaScript access (XSS protection)
    secure: false, // ensures cookie is sent only over HTTPS (set false for local dev)
    sameSite: 'strict', // prevents CSRF
    maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  });

  res.json({ message: 'HTTP-only cookie set!' });
});

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'IndiumSql@135',
//   database: 'index_check'
// });

// app.get("/",(_,res) => {
//     const query = 'SELECT COUNT(*) AS count FROM users_no_index'
//     connection.query(query,(err,results) => {
//         if(err) throw JSON.stringify(err)
//         console.log("results",results[0])
//         res.render("home",{
//             count:results[0].count
//         })
//     })
//     // var data = [];
//     // for(var i = 0; i < 10000; i++){
//     //     data.push([
//     //         faker.internet.username(),
//     //         i
//     //     ]);
//     // }
//     // res.send(data)
//     // var q = 'INSERT INTO users_with_index (name, age) VALUES ?';
//     // connection.query(q, [data], function(err, result) {
//     //   console.log("error",err);
//     //   console.log("response",result);
//     // });

// })

// app.post("/register",(req,res) => {
//     var q = 'INSERT INTO users_no_index SET ?';
//     let values = {
//         email: req.body.email
//     }
//     connection.query(q, values, function(err, result) {
//     console.log(err);
//     console.log("registertest",result);
//     res.redirect("/")
//     });
// })

// // console.log("data",data)
// // var q = 'INSERT INTO users_no_index (name, age) VALUES ?';
// // connection.query(q, [data], function(err, result) {
// //   console.log(err);
// //   console.log(result);
// // });

// console.log("connection", connection);
