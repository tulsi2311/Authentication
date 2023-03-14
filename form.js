
var express = require('express');
var app = express();
var mysql2 = require('mysql2')
app.set('view engine', 'ejs');
app.set('views', './views')
app.set(express.json());
app.listen(8089)

var bodyparser = require('body-parser');
//const Connection = require('mysql2/typings/mysql/lib/Connection');

app.use(bodyparser.urlencoded({ extended: true }));



var conection1 = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_application'
    }
)

conection1.connect(function (err) {
    if (err) throw err
    console.log("Conected Sucesfully!!!!")
})


app.post('/post', function (req, res) {

    var f_name = req.body.fname;
    console.log(f_name)
    var l_name = req.body.lname;
    var email = req.body.mail1;
    var phone = req.body.con;
    var status = req.body.relation;
    var state = req.body.state;
    var city = req.body.city;
    var pin = req.body.pin;
    var date = req.body.date;
    var gender = req.body.gender;
    var design = req.body.des1;

    var course = req.body.course;
    var board = req.body.board;
    var py = req.body.py;
    var per = req.body.per;
    console.log(course)
    console.log(board)
    console.log(py)
    console.log(per)
    var refname = req.body.refname;
    var refnum = req.body.refnum;
    var refrel = req.body.refrel;
    var refname2 = req.body.refname2;
    var refnum2 = req.body.refnum2;
    var refrel2 = req.body.refrel2;

    var prlocation = req.body.location;
    var noticeprd = req.body.prenot;
    var expctc = req.body.preectc;
    var curctc = req.body.precctc;
    var department = req.body.department;


    var cname = req.body.cname;
    var desi = req.body.desi2;
    var exfrom = req.body.ex;
    var exto = req.body.ex1;

    var read = req.body.read
    var write = req.body.write
    var speak = req.body.speak
    var language = req.body.language




    var appid;
    var sqlins = `insert into candidate_details(first_name,last_name,contact_no,city,state,pincode,email,gender,date_of_birth,designation,relation_status) values ('${f_name}','${l_name}','${phone}','${city}','${state}','${pin}','${email}','${gender}','${date}','${design}','${status}')`;

    conection1.query(sqlins, function (err, datains) {
        if (err) throw err;

        appid = datains.insertId;
        console.log(appid)

        //===================================================================================


        for (var i = 0; i < language.length; i++) {
            var sqllan = `INSERT INTO language_known (candidate_id, language_name, read_status, write_status, speak_status) VALUES ('${appid}','${language[i]}', '${(read) ? (read.includes(language[i]) ? 'yes' : 'no') : 'no'}', '${(write) ? (write.includes(language[i]) ? 'yes' : 'no') : 'no'}', '${(speak) ? (speak.includes(language[i]) ? 'yes' : 'no') : 'no'}')`;

            conection1.query(sqllan, function (err, datalan) {
                if (err) throw err;

            })
        }

        //===================================================================================================

        var tacname = req.body.tacname
        console.log(tacname);
        for (i = 0; i < tacname.length; i++) {

            techPRO = eval("req.body." + tacname[i]);
            console.log(techPRO);
            var sqltac = `insert into technology_known(candidate_id,technology_name, technology_konwn)values('${appid}','${tacname[i]}','${techPRO}');`
            conection1.query(sqltac, (err, datatac) => {
                if (err) throw err;
                console.log("hello")
            })
        }
        var sqledu3 = `)`;

        //================================education

        if (Array.isArray(per)) {
            for (var i = 0; i < per.length; i++) {
                var sqledu1 = `insert into candidate_education_details(candidate_id,cource_name,board_name,passing_year,percentage) values('${appid}','${course[0]}','${board[0]}','${py[0]}','${per[0]}');`
                console.log(sqledu1)

                conection1.query(sqledu1, function (err, resultexp1) {
                    if (err) throw err
                })
            }
        }
        else {
            var sqledu1 = `insert into candidate_education_details(candidate_id,cource_name,board_name,passing_year,percentage) values('${appid}','${course}','${board}','${py}','${per}');`
            console.log(sqledu1)
            conection1.query(sqledu1, function (err, resultexp1) {
                if (err) throw err
            })
        }



        //---------------------------------work ex-p

        if (Array.isArray(cname)) {
            for (var i = 0; i < cname.length; i++) {
                var sqlexp1 = `INSERT INTO work_exp (candidate_id, candidate_name, designation, experience_from, experience_to)values('${appid}','${cname[0]}','${desi[0]}','${exfrom[0]}','${exto[0]}');`
                console.log(sqlexp1)

                conection1.query(sqlexp1, function (err, resultexp1) {
                    if (err) throw err
                })
            }
        }
        else {
            var sqlexp1 = `INSERT INTO work_exp (candidate_id, candidate_name, designation, experience_from, experience_to) values('${appid}','${cname}','${desi}','${exfrom}','${exto}');`
            console.log(sqlexp1)
            conection1.query(sqlexp1, function (err, resultexp1) {
                if (err) throw err
            })
        }








        if (!refname == "") {
            var sqlref = `insert into referance_contact(candidate_id,contact_name,contact_number,contact_relation) values('${appid}','${refname}','${refnum}','${refrel}')`;
            console.log(sqlref)
            conection1.query(sqlref, function (err, resultref) {
                if (err) throw err
            })

        }
        if (!refname2 == "") {
            var sqlref2 = `insert into referance_contact(candidate_id,contact_name,contact_number,contact_relation) values('${appid}','${refname2}','${refnum2}','${refrel2}')`;
            console.log(sqlref2)
            conection1.query(sqlref2, function (err, resultref2) {
                if (err) throw err
            })
        }

        var sqlpre = `INSERT INTO job_application.candidate_preferance (candidate_id, preferd_location, notice_period, expacted_ctc, current_ctc, department) VALUES ('${appid}','${prlocation}','${noticeprd}','${expctc}','${curctc}','${department}')`;
        console.log(sqlpre)
        conection1.query(sqlpre, function (err, resultpre) {
            if (err) throw err

        })

        conection1.query(sqledu1, function (err, resulted1) {
            if (err) throw err


            res.end()

        });
    })
})





app.get("/", (req, res) => {
    var sql1 = `select * from state_master`;
    var sql2 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=2`;
    var sql3 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=3`;
    var sql4 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=4`;
    var sql5 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=5`;
    var sql6 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=6`;

    var sql7 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=7`;
    var sql8 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=8`;

    conection1.query(sql1, function (err, state) {
        if (err) throw err

        conection1.query(sql2, function (err, data2) {
            if (err) throw err

            conection1.query(sql3, function (err, data3) {
                if (err) throw err
                conection1.query(sql4, function (err, data4) {
                    if (err) throw err

                    conection1.query(sql5, function (err, data5) {
                        if (err) throw err
                        conection1.query(sql6, function (err, data6) {
                            if (err) throw err
                            conection1.query(sql7, function (err, data7) {
                                if (err) throw err
                                conection1.query(sql8, function (err, data8) {
                                    if (err) throw err
                                    console.log(state)
                                    res.render('form', { state, data2, data3, data4, data5, data6, data7, data8 });
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})


app.get('/cities', (req, res) => {
    const stateId = req.query.stateId;
    conection1.query('SELECT * FROM city_master WHERE state_id = ?', [stateId], (error, cities) => {
        if (error) {
            console.error('Error fetching cities: ', error);
            res.sendStatus(500);
        } else {

            res.json(cities);

            console.log(stateId)
        }
    });
});







