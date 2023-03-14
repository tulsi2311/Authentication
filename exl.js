

const express = require('express');
const mysql = require('mysql2');
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const e = require('express');
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const conexl = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_application",
  });
  
  // Connect to the database
  conexl.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Connected to database");
  });

app.get('/exl',(req,res)=>{



    var finame =req.query.first_name
    var laname = req.query.last_name
    var gender1 = req.query.gender
    var email1 = req.query.email
    var phone1 = req.query.phone
    conexl.query("select * from users",(err,users)=>{
        if(err) throw err;
   
    res.render("exl",{users,finame,laname,gender1,email1,phone1});
});
})

app.get('/save',(req,res)=>{

  const id = req.query.id;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const gender = req.query.gender;
  const email = req.query.email;
  const phone = req.query.phone;

  conexl.query('UPDATE users SET first_name = ?, last_name=?, gender=?,email=?,phone=? WHERE id = ?', [first_name,last_name,gender,email,phone,id], (error, results) => {
    if (error) throw error;
    console.log("updated!")
  });
})

app.get('/add',(req,res)=>{
  var first_name = req.query.first_name;
  var last_name = req.query.last_name;
  var gender = req.query.gender;
  var email = req.query.email;
  var phone = req.query.phone;

  conexl.query("insert into users(first_name,last_name,gender,email,phone) value(?,?,?,?,?)",[first_name,last_name,gender,email,phone],(err,result)=>{
    if(err) throw err;
    console.log(result)
    console.log("inserted")
    res.redirect("exel")
  })
})

app.post('/saveAll',(req,res)=>{
  const id = req.body.user_id;
  console.log(id)
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const gender = req.body.gender;
  const email = req.body.email;
  const phone = req.body.phone;
  console.log(req.body);

  
  for(let i=0; i<id.length; i++){
    let sql = `update users set first_name='${first_name[i]}',last_name='${last_name[i]}',gender='${gender[i]}',email='${email[i]}',phone='${phone[i]}' where id=${id[i]}`;
    conexl.query(sql,(err,result)=>{
      if(err) throw err;
      console.log("updated all");
    })
  } 
   
 
  const fname = req.body.nfirst_name;
  const lname = req.body.nlast_name;
  const gen = req.body.ngender;
  const em = req.body.nemail;
  const ph = req.body.nphone;

  console.log(typeof("type"+first_name));
  if(typeof(fname) == "string"){
    conexl.query('insert into users(first_name,last_name,gender,email,phone) value(?,?,?,?,?)',[fname,lname,gen,em,ph],(err,result)=>{
      if(err) throw err;
      console.log("inserted one")
    })
  }else if(typeof(fname) == "object"){
    for(let j=0; j<fname.length; j++){
      conexl.query('insert into users(first_name,last_name,gender,email,phone) value(?,?,?,?,?)',[fname[j],lname[j],gen[j],em[j],ph[j]],(err,result)=>{
        if(err) throw err;
        console.log("inserted all")
      
      })
    }
  }
  
})

app.get('/delete',(req,res)=>{
  const uid = req.query.uid;
  conexl.query(`delete from users where id = ${uid}`,(err,result)=>{
    if(err) throw err;
    console.log("deleted");
    
  })
})