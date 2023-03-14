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

let sql = "SELECT * FROM student_express limit 0,10";
connection.query(sql, function (err, result) {
  if (err) throw err;
});

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/sortdata", (req, res) => {
  var limit = 10;
  var data = ""
 
  var page_no = 0;
  var a = req.query.id
  var offset = (a - 1) * limit || 0
  var a = req.query.id
  var order = req.query.sort || "ASC"
  var cs = req.query.sort_by || 'student_id'
  console.log(cs)

  connection.query(`SELECT count(student_id) as count from student_express ;`, (err, result) => {
    // console.log(result)
    page_no = Math.ceil(result[0].count / limit)
  });

  connection.query(`select * from student_express order by ${cs} ${order} limit ${offset},${limit} `, (err, result) => {
    if (err) throw err;
    data = result;
    console.log(data)
  });


  setTimeout(() => {
    res.render("sorting", { page_no, data, cs, a, order });
  }, 1000);
});

const port = 8100
app.listen(port, () => {
  console.log("conected!!!!")
})
