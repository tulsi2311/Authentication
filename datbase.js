var express = require('express')
var mysql2 = require('mysql2')

var app = express()

app.listen(5050, function () {
    console.log("port sucessfully listing!!!")
})

var conection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "student_exp"
})

conection.connect(function (err) {
    if (err) throw err
    console.log("Sucessfully concted!!!")
})

var firstname = ['tulsi', 'om', 'poojs', 'darshit', 'jayraj', 'vikram',
    'rajesh', 'milan', 'jash', 'mit', 'nisarg', 'viraj', 'ketanraj',
    'manthan', 'gautam', 'jayesh', 'kuntal', 'manoj', 'darshil', 'kaushik',
    'hiren', 'pankaj', 'nyan', 'sagar', 'sidh', 'krupali', 'drashti',
    'seema', 'isha', 'bhuri', 'jyotshna']
var lastname = ['dholariya', 'dave', 'patoliya', 'hadiya',
    'bhudev', 'trivedi', 'nakum', 'jaliya', 'desai', 'gajipara',
    'dodiya', 'parmar', 'dave', 'makwana', 'makna', 'barot', 'kacha',
    'dangar', 'kamliya', 'vadher', 'patel', 'lagariya', 'bhatt', 'joshi',
    'advanui', 'malhotra']
// var mno
var city = ['bhuavnagar', 'Ahmedabad', 'SURAT', 'mahuva', 'baroda',
    'bombay', 'anad', 'pune', 'up', 'junagadh', 'porbandar', 'dwarka',
    'jamnagar', 'bengluru', 'delhi', 'mumbai']
var collegename = ['gec bvn', 'gec gandhinagar', 'gec rajkot', 'gec dahod', 'gec modasa',
    'gec patan', 'gec delhi', 'ddu', 'msu', 'bvm', 'ddl', 'om', 'spu', 'vir narmad']

app.post('/', (req, res) => {
    for (i = 0; i < 1500; i++) {
        let Firstname = firstname[parseInt(Math.random() * firstname.length)]
        //   console.log(firstname)
        let Lastname = lastname[parseInt(Math.random() * lastname.length)]
        //    console.log(firstname)
        let email = Firstname + Lastname + '@gmail.com'
        let Email = email
        let Mobileno = Math.floor(Math.random() * 10000000000) + 100000000;
        let Collegename = collegename[parseInt(Math.random() * collegename.length)]
        let City = city[parseInt(Math.random() * city.length)]
        conection.query(`insert into student_expres(first_name,last_name,mob_no,email,city,college_name) values("${Firstname}","${Lastname}","${Mobileno}","${Email}","${City}","${Collegename}");`, (err, result) => {
            if (err) throw err
            console.log("sucessfully inserted data!!!!" + result)
            // return res(result)
        })
    }
    res.send("inserted");
});