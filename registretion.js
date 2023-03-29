const express = require('express');
const mysql = require('mysql2');
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const e = require('express');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require('path')
const bcrypt = require("bcryptjs")
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const util = require('util')
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "login_data",
});
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









//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('/design', (req, res) => {

    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">login</a>`)
    }
    const tokendata = jwt.verify(jwtToken, "tulsi")
    res.render("design")
})



app.get('/tictac', (req, res) => {

    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">login</a>`)
    }
    const tokendata = jwt.verify(jwtToken, "tulsi")
    res.render("tictac")
})







//==================================================================================================
// Connect to the database
con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
});
var query = util.promisify(con.query).bind(con);

app.get('/', (req, res) => {
    res.render("register");
})

app.post('/reg', async (req, res) => {
    var name = req.body.uname
    var email = req.body.email
    var password = req.body.pwd
    console.log(req.query);
    console.log(password)
    var hashp = await bcrypt.hash(password, 10);
    console.log(hashp);

    var varifyUser = `select * from registretion_data where email = '${email}'`;
    var result = await query(varifyUser);
    console.log(result);
    if (result.length != 0) {
        return res.send(`<h1>user already register<a href="/login">click here</a></h1>`)
    }



    const activation_token = Math.random().toString(36).substring(2, 15);
    const activationLink = `http://localhost:8080/activate?token=${activation_token}`;
    var sqlins = `INSERT INTO login_data.registretion_data (user_name, user_password, email,activation_token) VALUES ('${name}', '${hashp}', '${email}','${activation_token}'); `;
    con.query(sqlins, (err, res) => {
        if (err) throw err;

        console.log("inserted")
    })

    res.send(`<h1>you register successsfully we send you login activation link very soon thank you for register  <a href="${activationLink}"> click here </a> </br> </h1>`)

})

app.get("/activate?", (req, res) => {
    const actKey = req.query.token;
    sql = `update registretion_data set activated = 1 where activation_token = "${actKey}"`;
    var result = con.query(sql);
    console.log("result");
    console.log(result);
    if (result.affectedRows == 0) {
        res.send("invalid activation link");
    } else {
        res.redirect("/login");
    }
});


app.get("/email", async (req, res) => {
    var email = req.query.email
    var emailsql = await query(`select email from  login_data.registretion_data where email='${email}'`)
    console.log(emailsql);
    if (emailsql.length > 0) {
        res.json({ exist: true })
    } else {
        res.json({ exist: false })
    }
})




app.get("/login", (req, res) => {
    res.render("login");
})

app.post('/login', async (req, res) => {

    const { email, pwd } = req.body;
    var varifyUser = `select * from registretion_data where activated = 1 and email = '${email}'`;



    var result = await query(varifyUser);
    console.log(result);
    if (result.length == 0) {
        return res.send(`<h1>user not regitered please register to <a href="/">click here</a></h1>`)
    }
    console.log(result[0]);
    const data = result[0];
    //comparing password
    var bpass = result[0].user_password;
    console.log("bpass", bpass)
    var match = await bcrypt.compare(pwd, bpass);
    console.log(match);
    if (!match) {
        return res.send(`wrong password!`)
    }

    //generating jwt token
    const jwtToken = jwt.sign(result[0], "tulsi");
    res.cookie("jwtToken", jwtToken);

    res.redirect('/home');

})




app.get("/editreg?", (req, res) => {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">login</a>`)
    }
    const tokendata = jwt.verify(jwtToken, "tulsi")

    console.log(tokendata)
    res.render("editreg", { tokendata });
})


app.post("/editreg", async (req, res) => {
    const { user_id, user_name, email, pwd, repwd } = req.body;
    const id = req.body.id;
    console.log(id);
    var sql = `SELECT * FROM registretion_data where user_id = ${id};`
    const result = await query(sql);;
    var oldPass = result[0].user_password;
    console.log("old p " + oldPass);
    var hashp = await bcrypt.hash(repwd, 10);
    var match = await bcrypt.compare(pwd, oldPass);
    console.log(match);
    if (match) {
        var sql1 = `update registretion_data set  email="${email}", user_password="${hashp}" where user_id= ${id};`
        var update = await query(sql1);
        console.log("edited");
        res.redirect('/home');
    } else {
        res.redirect('/editreg');
        console.log("old password not mathed");
    }
})



app.get('/home', (req, res) => {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">login</a>`)
    }
    const tokendata = jwt.verify(jwtToken, "tulsi")
    console.log(tokendata)
    res.render("home", { tokendata });

})


app.get("/logout", (req, res) => {

    res.clearCookie("jwttoken");
    res.redirect("/")
})





//=============================================================================

let sql = "SELECT * FROM student_express limit 0,10";
connection.query(sql, function (err, result) {
    if (err) throw err;
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/sortdata", (req, res) => {

    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">login</a>`)
    }
    const tokendata = jwt.verify(jwtToken, "tulsi")
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++==

var conedit = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_application'
    }
)

conedit.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
var page_no;
//=============-----------------------=============================------------------===============--------------==============-----
app.get('/search', function (req, res) {
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
        //console.log(firstname);
    }

    if (l_name.length > 1) {
        for (let i = 0; i < l_name[1].length; i++) {
            if (l_name[1].charAt(i) == '$' || l_name[1].charAt(i) == '@' || l_name[1].charAt(i) == '~' || l_name[1].charAt(i) == '*' || l_name[1].charAt(i) == '+' || l_name[1].charAt(i) == '#' || l_name[1].charAt(i) == '^')
                break;
            else
                lastname += l_name[1].charAt(i)
        }
        //console.log(lastname);
    }
    if (city.length > 1) {
        for (let i = 0; i < city[1].length; i++) {
            if (city[1].charAt(i) == '$' || city[1].charAt(i) == '@' || city[1].charAt(i) == '~' || city[1].charAt(i) == '*' || city[1].charAt(i) == '+' || city[1].charAt(i) == '#' || city[1].charAt(i) == '^')
                break;
            else
                cities += city[1].charAt(i)
        }
        //console.log(cities);
    }


    if (relationship_status.length > 1) {
        for (let i = 0; i < relationship_status[1].length; i++) {
            if (relationship_status[1].charAt(i) == '$' || relationship_status[1].charAt(i) == '@' || relationship_status[1].charAt(i) == '~' || relationship_status[1].charAt(i) == '*' || relationship_status[1].charAt(i) == '+' || relationship_status[1].charAt(i) == '#' || relationship_status[1].charAt(i) == '^')
                break;
            else
                re_status += relationship_status[1].charAt(i)
        }
        //console.log(re_status);
    }


    //var sql=`select * from candidate_details where is_delete = 0`
    //connection.query(sql,(err, result) =>{
    //if (err) throw err;
    //})
    var sqlser = `SELECT * FROM job_application.candidate_details WHERE last_name LIKE '%${lastname}%' AND first_name LIKE'%${firstname}%' AND city LIKE '%${cities}%'AND relation_status LIKE '%${re_status}%' AND is_delete = 0 ;`;

    //console.log(firstname)
    //console.log(sql)
    conedit.query(sqlser, (err, data) => {
        if (err) throw err;

        res.render('tableedit.ejs', { data, page_no });
    });
});

//--------------------------------------------------------------------------------------------------------------------

app.get("/page", (req, res) => {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">login</a>`)
    }
    const tokendata = jwt.verify(jwtToken, "tulsi")
    
    var ajaxx = req.query.ajax || false
    var limit = 10;
    var data = ""
    page_no = 0;
    var a = req.query.id;
    console.log(a)
    var offset = (a - 1) * limit || 0
    console.log(offset)

    conedit.query(`SELECT count(candidate_id) as count from candidate_details where is_delete = 0 ;`, (err, result) => {
        // console.log(result)
        page_no = Math.ceil(result[0].count / limit)
    });

    conedit.query(`select * from candidate_details where is_delete = 0  limit ${offset},${limit} `, (err, result) => {
        if (err) throw err;
        data = result;
        //console.log(data)


        if (!ajaxx) {
            setTimeout(() => {
                //console.log(page_no)
                res.render("tableedit", { page_no, data });
            }, 1000);
        }
        else {
            res.json(data)
        }
    });
    
})

//----------------------------------------------------------------------------------------------------------------------------------
app.post('/delete', (req, res) => {

    var id = req.query.id
    // console.log(id)

    //sqlprt=`select * from job_application.candidate_details  where is_delete = 0;`
    var sqldel = `update job_application.candidate_details set is_delete = 1 where candidate_id in ('${id}'); `
    conedit.query(sqldel, (err, data) => {
        if (err) throw err
        else {
            res.json({ data });
        }
    })
})


//==========-------------------=================--------------------------------======================================-----------
app.post('/deleteall', (req, res) => {

    var id = req.query.id
    // console.log(id)

    // dele = eval("req.body."+ tacname[i]);
    //sqlprt=`select * from job_application.candidate_details  where is_delete = 0;`
    var sqldel = `update job_application.candidate_details set is_delete = 1 where candidate_id in (${id}); `
    conedit.query(sqldel, (err, data) => {
        if (err) throw err
        else {
            res.json({ data });
        }
    })
})

app.get('/edit', async (req, res) => {



    var id1 = req.query.id
    var state = req.query.state
    console.log(state)


    var course = req.body.course;
    var board = req.body.board;
    var py = req.body.py;
    var per = req.body.per;
    console.log(course)
    console.log(board)
    console.log(py)
    console.log(per)

    var cname = req.query.cname
    var desig = req.query.desi2;
    var exfrom = req.query.ex;
    var exto = req.query.ex1;
    console.log(cname)
    console.log(desig)
    console.log(exfrom)
    console.log(exto)

    console.log(id1 + "id")
    console.log(state + "state")
    var sql1 = `select * from state_master`;
    var sqledi = `select * from candidate_details where candidate_id = ${id1}; `
    //var sqlgen = `select * from candidate_details where candidate_id = ${id1}; `

    var sqledu = `SELECT * FROM candidate_education_details where candidate_id= ${id1};`
    var sqlexp = `SELECT * FROM job_application.work_exp where candidate_id=${id1};`
    var sqlref = `SELECT * FROM job_application.referance_contact where candidate_id = ${id1};`
    var sqlpref = `SELECT * FROM job_application.candidate_preferance where candidate_id = ${id1};`
    var sqllan = `SELECT * FROM job_application.language_known where candidate_id=${id1};`
    var sqltec = `SELECT * FROM job_application.technology_known where candidate_id =${id1};`;


    var sqlrel = `select * from  select_master where select_id=2;`
    var sqlstate = `select * from  select_master where select_id=1;`
    var statename = `SELECT state  FROM job_application.state_master where id = ${state}; `
    var sql3 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=3`;
    var sql4 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=4`;
    var sql5 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=5`;

    var sql6 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=6`;
    var sql7 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=7`;

    var sql8 = `select opt_value from option_master inner join select_master on option_master.select_id=select_master.select_id where option_master.select_id=8`;





    conedit.query(sqledi, (err, data) => {
        if (err) throw err

        conedit.query(sqlrel, (err, datarel) => {
            if (err) throw err


            conedit.query(sql1, function (err, state) {
                if (err) throw err

                conedit.query(sqlstate, (err, datastate) => {
                    if (err) throw err
                    conedit.query(statename, (err, staten) => {
                        if (err) throw err
                        conedit.query(sql3, function (err, data3) {
                            if (err) throw err
                            conedit.query(sql4, function (err, data4) {
                                if (err) throw err
                                conedit.query(sqledu, function (err, dataedu) {
                                    if (err) throw err
                                    conedit.query(sqlexp, function (err, dataexp) {
                                        if (err) throw err
                                        conedit.query(sqlref, function (err, dataref) {
                                            if (err) throw err
                                            conedit.query(sqlpref, function (err, datapref) {
                                                if (err) throw err
                                                conedit.query(sql6, function (err, data6) {
                                                    if (err) throw err
                                                    conedit.query(sql5, function (err, data5) {
                                                        if (err) throw err
                                                        conedit.query(sqllan, function (err, datalan) {
                                                            if (err) throw err
                                                            conedit.query(sql7, function (err, data7) {
                                                                if (err) throw err
                                                                conedit.query(sqltec, function (err, datatec) {
                                                                    if (err) throw err
                                                                    conedit.query(sql8, function (err, data8) {
                                                                        if (err) throw err
                                                                        //console.log(sqledu)
                                                                        //console.log(sqlexp)
                                                                        //console.log(data3)
                                                                        //console.log(data4)
                                                                        console.log("dataref",dataref.length)
                                                                        res.render("form3.ejs", { data, datarel, datastate, state, staten, data7, datalan, data6, data3, data5, datatec, data4, data8, dataedu, dataexp, dataref, datapref });
                                                                        //editdetails
                                                                        //console.log(data5)
                                                                    
                                                                        // console.log(datarel)
                                                                        console.log(data)
                                                            
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
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
        const state = req.query.state

        console.log(stateId)
        conedit.query('SELECT * FROM city_master WHERE state_id = ?', [stateId], (error, cities) => {
            if (error) {
                console.error('Error fetching cities: ', error);
                res.sendStatus(500);
            } else {

                res.json(cities);

                console.log(state)
            }
        });
    });

})

app.post('/update1', (req, res) => {



    var id = req.body.id;
    var fname = req.body.fname;
    console.log(fname)
    var lname = req.body.lname;
    var mail1 = req.body.mail1;
    var cont = req.body.cont;
    var relation = req.body.relation;
    var state = req.body.state;
    var city = req.body.city;
    var pin = req.body.pin;
    var date = req.body.date;
    var gender = req.body.gender;
    var des1 = req.body.des1;

    var course = req.body.cource;
    var board = req.body.board;
    var py = req.body.py;
    var per = req.body.per;

    var cname = req.body.cname;
    var desi2 = req.body.desi2;
    var ex = req.body.ex;
    var ex1 = req.body.ex1;

    var nd = req.body;

    var read = req.body.read
    var write = req.body.write
    var speak = req.body.speak
    var language = req.body.language

    var refname1 = req.body.refname1;
    var refnum1 = req.body.refnum1;
    var refrel1 = req.body.refrel1;
    var refname2 = req.body.refname2;
    var refnum2 = req.body.refnum2;
    var refrel2 = req.body.refrel2;

    console.log(refname1)
    console.log(course)
    console.log(board)
    console.log(py)
    console.log(per)


    var update1 = `UPDATE candidate_details SET first_name = '${fname}', last_name = '${lname}', contact_no = '${cont}', city = '${city}', state = '${state}', pincode = '${pin}', email = '${mail1}', gender = '${gender}',date_of_birth= '${date}', designation = '${des1}', relation_status = '${relation}' WHERE (candidate_id = ${id});`;

    var updatepref = `UPDATE candidate_preferance SET preferd_location = '${nd.location}', notice_period = '${nd.prenot}', expacted_ctc = '${nd.preectc}', current_ctc = '${nd.precctc}', department = '${nd.department}' WHERE (candidate_id = ${nd.id});`;

    var update3 = `UPDATE candidate_education_details SET cource_name = 'cgh', board_name = 'cgm',passing_year = 'g', percentage = 'g' WHERE (candidate_cource_id = '4');`

    var deledu = `delete FROM job_application.candidate_education_details where candidate_id= ${id};`
    conedit.query(deledu, function (err, deledu1) {
        if (err) throw err
    })
    if (Array.isArray(per)) {
        for (var i = 0; i < per.length; i++) {
            var sqledu1 = `insert into candidate_education_details(candidate_id,cource_name,board_name,passing_year,percentage) values('${nd.id}','${course[i]}','${board[i]}','${py[i]}','${per[i]}');`
            //console.log(sqledu1)

            conedit.query(sqledu1, function (err, resultexp1) {
                if (err) throw err
            })
        }
    }
    else {
        var sqledu1 = `insert into candidate_education_details(candidate_id,cource_name,board_name,passing_year,percentage) values('${nd.id}','${course}','${board}','${py}','${per}');`
        //console.log(sqledu1)
        conedit.query(sqledu1, function (err, resultexp1) {
            if (err) throw err
        })
    }
    //=================================================================================================

    var delexp = `delete FROM work_exp where candidate_id= ${id};`
    conedit.query(delexp, function (err, delexp1) {
        if (err) throw err
    })
    if (Array.isArray(cname)) {
        for (var i = 0; i < cname.length; i++) {
            var sqlexp1 = `INSERT INTO work_exp (candidate_id, candidate_name, designation, experience_from, experience_to)values('${nd.id}','${cname[i]}','${desi2[i]}','${ex[i]}','${ex1[i]}');`

            //console.log(sqledu1)

            conedit.query(sqlexp1, function (err, resultexp1) {
                if (err) throw err
            })
        }
    }
    else {
        var sqlexp1 = `INSERT INTO work_exp (candidate_id, candidate_name, designation, experience_from, experience_to) values('${nd.id}','${cname}','${desi2}','${ex}','${ex1}');`

        // console.log(sqlexp1)
        conedit.query(sqlexp1, function (err, resultexp1) {
            if (err) throw err
        })
    }

    //=============================++++++++++++++++++++++++++++++++++++++++=============================

    var dellan = `delete FROM language_known where candidate_id= ${nd.id}`;
    conedit.query(dellan, function (err, dellan1) {
        if (err) throw err
        console.log("deleted")
    })
    if (Array.isArray(language)) {
        for (var i = 0; i < language.length; i++) {
            var sqllan = `INSERT INTO language_known (candidate_id, language_name, read_status, write_status, speak_status) VALUES ('${nd.id}','${language[i]}', '${(read) ? (read.includes(language[i]) ? 'yes' : 'no') : 'no'}', '${(write) ? (write.includes(language[i]) ? 'yes' : 'no') : 'no'}', '${(speak) ? (speak.includes(language[i]) ? 'yes' : 'no') : 'no'}')`;
            console.log(sqllan)
            conedit.query(sqllan, function (err, datalan) {
                if (err) throw err;

            })
        }
    }

    else {
        var sqllan = `INSERT INTO language_known (candidate_id, language_name, read_status, write_status, speak_status) VALUES ('${nd.id}','${language}', '${(read) ? (read.includes(language) ? 'yes' : 'no') : 'no'}','${(write) ? (write.includes(language) ? 'yes' : 'no') : 'no'}', '${(speak) ? (speak.includes(language) ? 'yes' : 'no') : 'no'}')`;

        conedit.query(sqllan, function (err, datalan) {
            if (err) throw err;
            console.log(sqllan)
        })
    }
    // console.log(updatepref)
    //console.log(update1)
    //====++++++++++++++++++++================================================++++++++++++++++==============
    var deltec = `delete FROM technology_known where candidate_id= ${id}`;
    conedit.query(deltec, function (err, deltec) {
        if (err) throw err
    })

    var tacname = req.body.tacname
    console.log(tacname);
    if (Array.isArray(language)) {
        for (i = 0; i < tacname.length; i++) {

            techPRO = eval("req.body." + tacname[i]);
            console.log(techPRO);
            var sqltac = `insert into technology_known(candidate_id,technology_name, technology_konwn)values('${nd.id}','${tacname[i]}','${techPRO}');`
            conedit.query(sqltac, (err, datatac) => {
                if (err) throw err;
                console.log("hello")
            })
        }
        var sqledu3 = `)`;

    }
    //===========================================================================================
    var delref = `delete FROM referance_contact where candidate_id= ${id}`;
    conedit.query(delref, function (err, delref1) {
        if (err) throw err
    })


    if (refname1.length > 1) {
        var sqlref1 = `insert into referance_contact(candidate_id,contact_name,contact_number,contact_relation) values('${nd.id}','${refname1}','${refnum1}','${refrel1}')`;
        console.log(sqlref1)
        conedit.query(sqlref1, function (err, resultref1) {
            if (err) throw err
        })

    }
    if (refname2.length > 1) {
        var sqlref2 = `insert into referance_contact(candidate_id,contact_name,contact_number,contact_relation) values('${nd.id}','${refname2}','${refnum2}','${refrel2}')`;
        console.log(sqlref2)
        conedit.query(sqlref2, function (err, resultref2) {
            if (err) throw err
        })
    }


    conedit.query(update1, (err, data) => {
        if (err) throw err
        console.log(data)
        conedit.query(updatepref, (err, datapref) => {
            if (err) throw err
            console.log(data)
            console.log(datapref)
            res.render('update')
        })
    })
})




//*************************************************************************************************8 */




app.get('/serchdel', function (req, res) {
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
    conn.query(sql, (err, dataprt) => {
        if (err) throw err;

        res.render('table.ejs', { dataprt });
    });

})


app.post('/table', (req, res) => {

    var id = req.query.id
    console.log(id)

    //sqlprt=`select * from job_application.candidate_details  where is_delete = 0;`
    var sqldel = `update job_application.candidate_details set is_delete = 1 where candidate_id in ('${id}'); `
    conn.query(sqldel, (err, data) => {
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
    conn.query(sqldel, (err, data) => {
        if (err) throw err
        else {
            res.json({ data });
        }
    })
})









//***************************************************************************************************** */
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

app.get('/exl', (req, res) => {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">login</a>`)
    }
    const tokendata = jwt.verify(jwtToken, "tulsi")


    var finame = req.query.first_name
    var laname = req.query.last_name
    var gender1 = req.query.gender
    var email1 = req.query.email
    var phone1 = req.query.phone
    conexl.query("select * from users", (err, users) => {
        if (err) throw err;

        res.render("exl", { users, finame, laname, gender1, email1, phone1 });

    });
})

app.get('/save', (req, res) => {

    const id = req.query.id;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const gender = req.query.gender;
    const email = req.query.email;
    const phone = req.query.phone;

    conexl.query('UPDATE users SET first_name = ?, last_name=?, gender=?,email=?,phone=? WHERE id = ?', [first_name, last_name, gender, email, phone, id], (error, results) => {
        if (error) throw error;
        console.log("updated!")
    });
})

app.get('/add', (req, res) => {
    var first_name = req.query.first_name;
    var last_name = req.query.last_name;
    var gender = req.query.gender;
    var email = req.query.email;
    var phone = req.query.phone;

    conexl.query("insert into users(first_name,last_name,gender,email,phone) value(?,?,?,?,?)", [first_name, last_name, gender, email, phone], (err, result) => {
        if (err) throw err;
        console.log(result)
        console.log("inserted")
        res.redirect("exel")
    })
})

app.post('/saveAll', (req, res) => {
    const id = req.body.user_id;
    console.log(id)
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const email = req.body.email;
    const phone = req.body.phone;
    console.log(req.body);


    for (let i = 0; i < id.length; i++) {
        let sql = `update users set first_name='${first_name[i]}',last_name='${last_name[i]}',gender='${gender[i]}',email='${email[i]}',phone='${phone[i]}' where id=${id[i]}`;
        conexl.query(sql, (err, result) => {
            if (err) throw err;
            console.log("updated all");
        })
    }


    const fname = req.body.nfirst_name;
    const lname = req.body.nlast_name;
    const gen = req.body.ngender;
    const em = req.body.nemail;
    const ph = req.body.nphone;

    console.log(typeof ("type" + first_name));
    if (typeof (fname) == "string") {
        conexl.query('insert into users(first_name,last_name,gender,email,phone) value(?,?,?,?,?)', [fname, lname, gen, em, ph], (err, result) => {
            if (err) throw err;
            console.log("inserted one")
        })
    } else if (typeof (fname) == "object") {
        for (let j = 0; j < fname.length; j++) {
            conexl.query('insert into users(first_name,last_name,gender,email,phone) value(?,?,?,?,?)', [fname[j], lname[j], gen[j], em[j], ph[j]], (err, result) => {
                if (err) throw err;
                console.log("inserted all")

            })
        }
    }

})

app.get('/delete', (req, res) => {
    const uid = req.query.uid;
    conexl.query(`delete from users where id = ${uid}`, (err, result) => {
        if (err) throw err;
        console.log("deleted");

    })
})

//==========================================================================================================================
//=============================================================================================




var conection1 = mysql.createConnection(
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


app.post('/postform', function (req, res) {

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





app.get("/form1", (req, res) => {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">login</a>`)
    }
    const tokendata = jwt.verify(jwtToken, "tulsi")
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


//=========================================================================================================




const concombo = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'job_application'
});

concombo.connect((err) => {
  if (err) throw err;
  console.log("connected !!");
});

///ComboGenerator
async function generateCombo(combo) {
  var comboname = combo;

  var query2 = `select opt_value, select_master.select_id from job_application.select_master join job_application.option_master on job_application.select_master.select_id = job_application.option_master.select_id where job_application.option_master.selected_value ='${comboname}';`
  var data = await getdata(query2);

  console.log("data",data);


  var comboStr = "";
  comboStr += `<select id='${comboname}' name='${comboname}'>`;

  for (let i = 0; i < data.length; i++) {
    comboStr += `<option value='${data[i].id}'>${data[i].opt_value}</option>`;
  }
  comboStr += `</select>`;
  console.log("combostr",comboStr);
  console.log(comboname);
  return comboStr;
}
function getdata(query) {
  return new Promise((resolve, reject) => {
    concombo.query(query, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}
app.get('/combo', async (req, res) => {

  var c1 = await generateCombo('state');
  console.log("c1",c1);
  var c2 = await generateCombo('relationship_status');
  console.log("c2",c2);

  var c3 = await generateCombo('location');
  var c4 = await generateCombo('department');
  var c5 = await generateCombo('cource');
 console.log("c3",c3);
 console.log("c4",c4);
 console.log("c5",c5);
  res.render('formnew.ejs', { state: c1, relationship_status: c2, location: c3, department: c4, cource: c5 });

});





