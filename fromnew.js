
var express = require('express');
var app = express();
var mysql2 = require('mysql2')
app.set('view engine', 'ejs');
app.set('views', './views')
app.set(express.json());
app.listen(8000)

var bodyparser = require('body-parser');
const { resolveInclude } = require('ejs');
//const Connection = require('mysql2/typings/mysql/lib/Connection');

app.use(bodyparser.urlencoded({ extended: true }));



var conection = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_application'
    }
)

conection.connect(function (err) {
    if (err) throw err
    console.log("Conected Sucesfully!!!!")
})


app.get('/option', async (req, res) => {
    var op1 = await generateOpt('state');
    var op2 = await generateOpt('relation');
    var op3 = await generateOpt('cource');
    var op4 = await generateOpt('board');
    var op5 = await generateOpt('dept');
    var op6 = await generateOpt('location');
    var op7 = await generateOpt('language');
    var op8 = await generateOpt('tech');

    res.render('formnew.ejs', { state: op1, tech: op8, relation: op2, cource: op3, board: op4, dept: op5, location: op6, language: op7 });
});

async function generateOpt(option) {
    var optname = option;
    console.log(optname)
    var sqlopt = `select opt_value from option_master  join select_master on option_master.select_id=select_master.select_id  where option_master.opt_key = '${optname}';`
    console.log(sqlopt)
    var data = await getdata(sqlopt)

    var optstr = "";
    optstr += `<lable for='${optname}'>${optname}</lable><select id='${optname}' name='${optname}'>`;


    for (let i = 0; i < data.length; i++) {
        optstr += `<option value='${data[i].select_id}'>${data[i].opt_value}</option>`;
    }

    optstr += `</select>`;
    return optstr;
}

function getdata(query) {
    return new Promise((resolve, reject) => {
        conection.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        })
    })
}