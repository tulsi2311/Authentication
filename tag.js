
const express = require('express');
const mysql = require('mysql2');
const app = express();
const ejs = require('ejs');
const { log } = require('util');

app.set('view engine', 'ejs');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'job_application'
});

con.connect((err) => {
  if (err) throw err;
  console.log("connected !!");
});

///ComboGenerator
async function generateCombo(combo) {

  var comboname = combo;

  var query2 = `select opt_value, select_master.select_id from job_application.select_master join job_application.option_master on job_application.select_master.select_id = job_application.option_master.select_id where job_application.option_master.selected_value ='${comboname}';`
  var data = await getdata(query2);

  console.log(data);


  var comboStr = "";
  comboStr += `<select id='${comboname}' name='${comboname}'>`;

  for (let i = 0; i < data.length; i++) {
    comboStr += `<option value='${data[i].id}'>${data[i].opt_value}</option>`;
  }
  comboStr += `</select>`;
  console.log(comboStr);
  return comboStr;

}

function getdata(query) {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

app.get('/combo', async (req, res) => {


  var c1 = await generateCombo('states');
  console.log(c1);
  var c2 = await generateCombo('relationship');
  var c3 = await generateCombo('location');
  var c4 = await generateCombo('departments');
  var c5 = await generateCombo('courses');

  res.render('formnew.ejs', { states: c1, relation: c2, location: c3, departments: c4, courses: c5 });

});



app.listen(3000);


