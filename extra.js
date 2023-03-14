const express = require('express');
const mysql = require('mysql2');
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const e = require('express');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcryptjs")
app.listen(8090);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "login_data",
});

// Connect to the database
con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.get('/',(req,res)=>{
    res.render("register");
})
app.get('/reg', async (req, res) => {
    var name = req.query.uname
    var email = req.query.email
    var password = req.query.pwd
    console.log(password)
    var hashp = await bcrypt.hash(password,10);
    console.log(hashp);
       var sqlins= `INSERT INTO login_data.registretion_data (user_name, user_password, email) VALUES ('${name}', '${hashp}', '${email}'); `;
       con.query(sqlins,(err,res)=>{
        if(err) throw err;
        
        console.log("inserted")
       })
     
 
})

app.post('/login',async(req,res)=>{
    var name = req.body.uname
    var email = req.body.email
    var password = req.body.pwd
var verifyuser=`SELECT * FROM login_data.registretion_data WHERE email='${email}'`;
var result= await con.execute(verifyuser)
if(result[0].length==0)
{
    return res.send("user not found")
}
console.log(result[0]);
const data=result[0];

let datapass=result[0];
console.log("datapass",datapass);
var match= await bcrypt.compare(password,datapass);
console.log(match)
if(!match){
    return res.send('wrong password!!')
}


//genrate jwt token
const jwttoken= jwt.sign(data[0],"tulsi");
res.cookie("jwttoken", jwttoken)
const tokendata=jwt.verify(jwttoken,"tulsi")
console.log(tokendata)

res.render("home",{tokendata});

})

app.get('/home', (req, res) => {
const jwttoken=req.cookies.jwttoken;
if(!jwttoken){
    return res.send(`you are not authorized register first <a href="/">register</a>`)
}

})


app.get("/logout",(req,res)=>
{
    res.clearCookie("jwttoken");
    res.redirect("/")
})
















async function validateemail() {

    
    var email = document.getElementById("email").value

    var flag = false;
    
    if (flag == false) {
        await fetch("/email?email=" + email + "").then((res) => {
            return res.json()
        }).then((resemail) => {
            console.log("inejs"+resemail);
            if (email == resemail) {
                document.getElementById('err').innerHTML = "Email alredy registered!.....";
                flag = false;
            }
            else {
                document.getElementById('err').innerHTML = null;
                flag = true;
            }
        })
        return flag
    }
}






 function validation() {
    
    document.getElementById("submit").disabled = true;
  
   
    var emailch=validateemail()
 
    console.log(emailch);


    var name1 = document.getElementById("uname").value
    var email = document.getElementById("email").value
    var pw = document.getElementById("pwd").value;
    var repw = document.getElementById("repwd").value;

    console.log(pw)
    console.log(repw)
    console.log(name1)
    console.log(email)
    // enter name
    if (name1 == ""|| name1=="null") {
        document.getElementById("err").innerHTML = "Fill the name feild!";
        return false;
    }

    


    //check empty password field  
    if (pw != repw) {
        document.getElementById("err").innerHTML = "password not same!";
        return false;
    }
    if (pw === repw) {
        document.getElementById('err').innerHTML = null;
        document.getElementById("submit").disabled = false;
        return true;
        }
    if (pw == " ") {
        document.getElementById("err").innerHTML = "Fill the password please!";
        return false;
    }
    //minimum password length validation  
    if (pw.length < 8) {
        document.getElementById("err").innerHTML = "Password length must be atleast 8 characters";
        return false;
    }
    if (pw.length > 8) {
        
        document.getElementById("submit").disabled = false;
        return true;
    }


    //maximum length of password validation  
    if (pw.length > 15) {
        document.getElementById("err").innerHTML = "Password length must not exceed 15 characters";
        return false;
    }
    if (pw.length < 15) {
        document.getElementById("submit").disabled = false;
        return true;
    }
    
    
    else {

        document.getElementById("err").style.display = "none";
        document.getElementById("submit").disabled = false;
        return true;
    }
}























var con1 = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_application'
    }
)

con.con1(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

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
    con1.query(sql, (err, dataser) => {
        if (err) throw err;

        res.render('testt.ejs', { dataser });
    });
});

//--------------------------------------------------------------------------------------------------------------------

app.get("/page", (req, res) => {
    var ajaxx = req.query.ajax || false
    var limit = 10;
    var data = ""
    var page_no = 0;
    var a = req.query.id;
    console.log(a)
    var offset = (a - 1) * limit || 0
    console.log(offset)

    con1.query(`SELECT count(candidate_id) as count from candidate_details where is_delete = 0 ;`, (err, result) => {
        // console.log(result)
        page_no = Math.ceil(result[0].count / limit)
    });

    con1.query(`select * from candidate_details where is_delete = 0  limit ${offset},${limit} `, (err, result) => {
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
    con1.query(sqldel, (err, data) => {
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
    con1.query(sqldel, (err, data) => {
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





    con1.query(sqledi, (err, data) => {
        if (err) throw err

        con1.query(sqlrel, (err, datarel) => {
            if (err) throw err


            con1.query(sql1, function (err, state) {
                if (err) throw err

                con1.query(sqlstate, (err, datastate) => {
                    if (err) throw err
                    con1.query(statename, (err, staten) => {
                        if (err) throw err
                        con1.query(sql3, function (err, data3) {
                            if (err) throw err
                            con1.query(sql4, function (err, data4) {
                                if (err) throw err
                                con1.query(sqledu, function (err, dataedu) {
                                    if (err) throw err
                                    con1.query(sqlexp, function (err, dataexp) {
                                        if (err) throw err
                                        con1.query(sqlref, function (err, dataref) {
                                            if (err) throw err
                                            con1.query(sqlpref, function (err, datapref) {
                                                if (err) throw err
                                                con1.query(sql6, function (err, data6) {
                                                    if (err) throw err
                                                    con1.query(sql5, function (err, data5) {
                                                        if (err) throw err
                                                        con1.query(sqllan, function (err, datalan) {
                                                            if (err) throw err
                                                            con1.query(sql7, function (err, data7) {
                                                                if (err) throw err
                                                                con1.query(sqltec, function (err, datatec) {
                                                                    if (err) throw err
                                                                    con1.query(sql8, function (err, data8) {
                                                                        if (err) throw err
                                                                        //console.log(sqledu)
                                                                        //console.log(sqlexp)
                                                                        //console.log(data3)
                                                                        //console.log(data4)

                                                                        res.render("form3.ejs", { data, datarel, datastate, state, staten, data7, datalan, data6, data3, data5, datatec, data4, data8, dataedu, dataexp, dataref, datapref });
                                                                        //editdetails
                                                                        //console.log(data5)
                                                                        console.log(dataref)
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
        con1.query('SELECT * FROM city_master WHERE state_id = ?', [stateId], (error, cities) => {
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
    con.query(deledu, function (err, deledu1) {
        if (err) throw err
    })
    if (Array.isArray(per)) {
        for (var i = 0; i < per.length; i++) {
            var sqledu1 = `insert into candidate_education_details(candidate_id,cource_name,board_name,passing_year,percentage) values('${nd.id}','${course[i]}','${board[i]}','${py[i]}','${per[i]}');`
            //console.log(sqledu1)

            con1.query(sqledu1, function (err, resultexp1) {
                if (err) throw err
            })
        }
    }
    else {
        var sqledu1 = `insert into candidate_education_details(candidate_id,cource_name,board_name,passing_year,percentage) values('${nd.id}','${course}','${board}','${py}','${per}');`
        //console.log(sqledu1)
        con1.query(sqledu1, function (err, resultexp1) {
            if (err) throw err
        })
    }
    //=================================================================================================

    var delexp = `delete FROM work_exp where candidate_id= ${id};`
    con1.query(delexp, function (err, delexp1) {
        if (err) throw err
    })
    if (Array.isArray(cname)) {
        for (var i = 0; i < cname.length; i++) {
            var sqlexp1 = `INSERT INTO work_exp (candidate_id, candidate_name, designation, experience_from, experience_to)values('${nd.id}','${cname[i]}','${desi2[i]}','${ex[i]}','${ex1[i]}');`

            //console.log(sqledu1)

            con1.query(sqlexp1, function (err, resultexp1) {
                if (err) throw err
            })
        }
    }
    else {
        var sqlexp1 = `INSERT INTO work_exp (candidate_id, candidate_name, designation, experience_from, experience_to) values('${nd.id}','${cname}','${desi2}','${ex}','${ex1}');`

        // console.log(sqlexp1)
        con1.query(sqlexp1, function (err, resultexp1) {
            if (err) throw err
        })
    }

    //=============================++++++++++++++++++++++++++++++++++++++++=============================

    var dellan = `delete FROM language_known where candidate_id= ${nd.id}`;
    con1.query(dellan, function (err, dellan1) {
        if (err) throw err
        console.log("deleted")
    })
    if (Array.isArray(language)) {
        for (var i = 0; i < language.length; i++) {
            var sqllan = `INSERT INTO language_known (candidate_id, language_name, read_status, write_status, speak_status) VALUES ('${nd.id}','${language[i]}', '${(read) ? (read.includes(language[i]) ? 'yes' : 'no') : 'no'}', '${(write) ? (write.includes(language[i]) ? 'yes' : 'no') : 'no'}', '${(speak) ? (speak.includes(language[i]) ? 'yes' : 'no') : 'no'}')`;
            console.log(sqllan)
            con1.query(sqllan, function (err, datalan) {
                if (err) throw err;

            })
        }
    }

    else {
        var sqllan = `INSERT INTO language_known (candidate_id, language_name, read_status, write_status, speak_status) VALUES ('${nd.id}','${language}', '${(read) ? (read.includes(language) ? 'yes' : 'no') : 'no'}','${(write) ? (write.includes(language) ? 'yes' : 'no') : 'no'}', '${(speak) ? (speak.includes(language) ? 'yes' : 'no') : 'no'}')`;

        con1.query(sqllan, function (err, datalan) {
            if (err) throw err;
            console.log(sqllan)
        })
    }
    // console.log(updatepref)
    //console.log(update1)
    //====++++++++++++++++++++================================================++++++++++++++++==============
    var deltec = `delete FROM technology_known where candidate_id= ${id}`;
    con1.query(deltec, function (err, deltec) {
        if (err) throw err
    })

    var tacname = req.body.tacname
    console.log(tacname);
    if (Array.isArray(language)) {
        for (i = 0; i < tacname.length; i++) {

            techPRO = eval("req.body." + tacname[i]);
            console.log(techPRO);
            var sqltac = `insert into technology_known(candidate_id,technology_name, technology_konwn)values('${nd.id}','${tacname[i]}','${techPRO}');`
            con1.query(sqltac, (err, datatac) => {
                if (err) throw err;
                console.log("hello")
            })
        }
        var sqledu3 = `)`;

    }
    //===========================================================================================
    var delref = `delete FROM referance_contact where candidate_id= ${id}`;
    con1.query(delref, function (err, delref1) {
        if (err) throw err
    })


    if (refname1.length > 1) {
        var sqlref1 = `insert into referance_contact(candidate_id,contact_name,contact_number,contact_relation) values('${nd.id}','${refname1}','${refnum1}','${refrel1}')`;
        console.log(sqlref1)
        con1.query(sqlref1, function (err, resultref1) {
            if (err) throw err
        })

    }
    if (refname2.length > 1) {
        var sqlref2 = `insert into referance_contact(candidate_id,contact_name,contact_number,contact_relation) values('${nd.id}','${refname2}','${refnum2}','${refrel2}')`;
        console.log(sqlref2)
        con1.query(sqlref2, function (err, resultref2) {
            if (err) throw err
        })
    }


    con.query(update1, (err, data) => {
        if (err) throw err
        console.log(data)
        con1.query(updatepref, (err, datapref) => {
            if (err) throw err
            console.log(data)
            console.log(datapref)
            res.render('update')
        })
    })
})













































