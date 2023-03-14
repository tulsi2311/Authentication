const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "job_application"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

let sql = "SELECT * FROM candidate_details where is_delete=0 limit 0,10";
connection.query(sql, function (err, result) {
  if (err) throw err;
});

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/page", (req, res) => {
  var ajaxx = req.query.ajax || false
  var limit = 10;
  var data = ""

  var page_no = 0;
  var a = req.query.id
  var offset = (a - 1) * limit || 0



  connection.query(`SELECT count(candidate_id) as count from candidate_details ;`, (err, result) => {
    // console.log(result)
    page_no = Math.ceil(result[0].count / limit)
  });

  connection.query(`select * from candidate_details  limit ${offset},${limit} `, (err, result) => {
    if (err) throw err;
    data = result;
    console.log(data)


    if (!ajaxx) {
      setTimeout(() => {
        console.log(page_no, data)
        res.render("page_1", { page_no, data });
      }, 1000);
    }
    else {
      res.json(data)
    }
  });
})
const port = 8000
app.listen(port, () => {
  console.log("conected!!!!")
})
