// var mysql = require('mysql2')
// var express = require('express')
// var app = express()
// let id=req.query.collage_id;
// let name=req.query.collage_name
// app.listen(8082)

// var connection = mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password:"root",
//   database:"student"
// })
// var select="select * from student_master"
// var insert = "insert into student_collage_id(collage_id,collage_name) values(?,?)"
// connection.connect(function(err){
//   if (err) throw err
//   else{
//     console.log("sucessfull!!!");}})

// app.get("/get", function(req,res){
//   // var select="select * from student_master"
// connection.query(select,function(err,res2){
//   if (err) throw err
//   else{
//     console.log("sucessfull!!!");
//     return res.json(res2)}
// })
// })

// app.post("/post", function(req,res){
//   var id = query.res.collage_id;
//   var name=query.res.collagename;

//  // var insert = "insert into student_collage_id(collage_id,collage_name) values(?,?)"
// connection.query(insert,[id,name],(err,res2)=>{
//   if (err) throw err
//   else{
//     console.log("sucessfull!!!");
//     return res.json(res2)
//   }
// })
//  })







// var connection = mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password:"root",
//   database:"student"
// })
// const lname = ["Devi","Singh","Kumar","Das","Kaur","Ram","Yadav"];
// const fname=["Devika","Singham","Karan","Devdas","majnu","Ram","lakhan"];
// const date=  Math.floor((Math.random() * 30) + 1);
// const month=  Math.floor((Math.random() * 12) + 1);
// const year=  Math.floor((Math.random() * 30) + 1);
// for(i=0;i<=laname.length-1;i++)
// {
//   for(var j=0;j<fname.length;j++){

//     console.log(lname[i]," ",fname[j])
//   }
// }








// const express = require("express");
// const mysql = require("mysql2");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "student_exp"
// });
// app.use(express.json({limit: '25mb'}));
// //sapp.use(express.urlencoded({limit: '25mb'}));
// connection.connect();

// app.post("/post", (req, res) => {
//   const jsonData = req.body;
// for(var i=50;i<99;i++){
//   const sql = `INSERT INTO student_express (f_name,l_name,email,city,collage_name,contact_no) values("${jsonData[i].f_name}","${jsonData[i].l_name}","${jsonData[i].l_email}","${jsonData[i].city}","${jsonData[i].collage_name}","${jsonData[i].contact_no}")`;
//   connection.query(sql);

//     }
//   });


// app.listen(8080, () => {
//   console.log("Server started on port 3000");
// });


const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "student_exp"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
});
var data = []

let sql = "SELECT * FROM student_express limit 0,10";

connection.query(sql, function (err, result) {
  if (err) throw err;
  //console.log(result);
});

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");



// for(var i=0;i<7;i++){

//   let sql= `SELECT * FROM student_express limit ${i*10},10 `;

//   connection.query(sql, function(err, result) {
//     if (err) throw err;
//     data.push(result)
//   console.log(result)
// });
// }

app.get("/", (req, res) => {
  var limit = 10;
  var data = ""
  //var a=req.query.id;
  //var xyz="";
  var page_no = 0;
  var offset = (req.query.id - 1) * limit || 0
  // daynamic page 
  connection.query(`SELECT count(student_id) as count from student_express ;`, (err, result) => {
    console.log(result)
    page_no = Math.ceil(result[0].count / limit)
  })
  connection.query(`SELECT * from student_express limit ${offset},${limit}`, (err, result) => {
    if (err) throw err;
    data = result;
    console.log(data)
  });
  setTimeout(() => {
    res.render("test", { page_no, data });
  }, 1000);
});

const port = 8080
app.listen(port, () => {
  console.log("conected!!!!")
})
