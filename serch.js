var mysql = require('mysql2');
var express = require('express');
var app = express();
app.set(express.json());
app.set('view engine', 'ejs');

var conn = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_application'
    }
)

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/get', function (req, res) {
    var search = req.query.search || '';
    var firstname = "";
    var lastname = "";
    var cities = "";
    var re_status = "";


    var f_name = search.split('^');
    var l_name = search.split('$');
    var city = search.split('@');
    var relationship_status = search.split('~');


    if (f_name.length > 1) {
        for (var i = 0; i < f_name[1].length; i++) {
            if (f_name[1].charAt(i) == '$' || f_name[1].charAt(i) == '@' || f_name[1].charAt(i) == '~' || f_name[1].charAt(i) == '*' || f_name[1].charAt(i) == '+' || f_name[1].charAt(i) == '#' || f_name[1].charAt(i) == '^')
                break;
            else
                firstname += f_name[1].charAt(i)
        }
        console.log(firstname);
    }

    if (l_name.length > 1) {
        for (let i = 0; i < l_name[1].length; i++) {
            if (l_name[1].charAt(i) == '$' || l_name[1].charAt(i) == '@' || l_name[1].charAt(i) == '~' || l_name[1].charAt(i) == '*' || l_name[1].charAt(i) == '+' || l_name[1].charAt(i) == '#' || l_name[1].charAt(i) == '^')
                break;
            else
                lastname += l_name[1].charAt(i)
        }
        console.log(lastname);
    }
    if (city.length > 1) {
        for (let i = 0; i < city[1].length; i++) {
            if (city[1].charAt(i) == '$' || city[1].charAt(i) == '@' || city[1].charAt(i) == '~' || city[1].charAt(i) == '*' || city[1].charAt(i) == '+' || city[1].charAt(i) == '#' || city[1].charAt(i) == '^')
                break;
            else
                cities += city[1].charAt(i)
        }
        console.log(cities);
    }


    if (relationship_status.length > 1) {
        for (let i = 0; i < relationship_status[1].length; i++) {
            if (relationship_status[1].charAt(i) == '$' || relationship_status[1].charAt(i) == '@' || relationship_status[1].charAt(i) == '~' || relationship_status[1].charAt(i) == '*' || relationship_status[1].charAt(i) == '+' || relationship_status[1].charAt(i) == '#' || relationship_status[1].charAt(i) == '^')
                break;
            else
                re_status += relationship_status[1].charAt(i)
        }
        console.log(re_status);
    }


    var sql = `SELECT * FROM job_application.candidate_details WHERE last_name LIKE '%${lastname}%' AND first_name LIKE'%${firstname}%' AND city LIKE '%${cities}%'AND relation_status LIKE '%${re_status}%' AND is_delete = 0  LIMIT 0, 10;`

    console.log(firstname)
    console.log(sql)
    con.query(sql, (err, dataprt) => {
        if (err) throw err;

        res.render('table.ejs', { dataprt });
    });

})


app.post('/table', (req, res) => {

    var id = req.query.id
    console.log(id)

    //sqlprt=`select * from job_application.candidate_details  where is_delete = 0;`
    var sqldel = `update job_application.candidate_details set is_delete = 1 where candidate_id in ('${id}'); `
    con.query(sqldel, (err, data) => {
        if (err) throw err
        else {
            res.json({ data });
        }
    })
})


app.post('/tableall', (req, res) => {

    var id = req.query.id
    console.log(id)

    // dele = eval("req.body."+ tacname[i]);
    //sqlprt=`select * from job_application.candidate_details  where is_delete = 0;`
    var sqldel = `update job_application.candidate_details set is_delete = 1 where candidate_id in (${id}); `
    con.query(sqldel, (err, data) => {
        if (err) throw err
        else {
            res.json({ data });
        }
    })
})
app.listen(8090);