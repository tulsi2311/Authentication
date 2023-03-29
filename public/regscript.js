function validatename() {

    var uname = document.getElementById("uname").value;

    console.log(uname)

    if (uname == "" || uname == "null") {
        // alert("Enter your Name Please!");
        document.getElementById("nameerr").innerHTML = "Enter your name Please!";
        return false;
    }
    else if (!isNaN(uname)) {

        document.getElementById("nameerr").innerHTML = "Enter Characters only!"
        return false
    }
    else {
        document.getElementById("nameerr").innerHTML = null

        return true
    }
}


function validateemail() {

    var email = document.getElementById("email").value;
    console.log(email);
    fetch(`/email?email=${email}`).then
        (res => res.json()).then
        (data => {
            console.log(data);
            if (data.exist) {
              
                document.getElementById("err").innerHTML = "email already exist";
            } else {
               
                document.getElementById("err").innerHTML = "";
            }
        })


}

async function validatepass() {
    document.getElementById("submit").disabled = true;
    var pass = document.getElementById("pwd").value;
    var repass = document.getElementById("repwd").value;
    var namech = validatename()
    var emailch = validateemail()
    console.log(namech);
    console.log(emailch);




    var lowerCaseLetters = /[a-z]/g;
    if (pwd.value.match(lowerCaseLetters)) {

    }
     else {
        document.getElementById("pwder").innerHTML = " Password must contain lowercase latter"
        return false;

    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (pwd.value.match(upperCaseLetters)) {

    } else {
        document.getElementById("pwder").innerHTML = "password must contain capital latter"
        return false;

    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (pwd.value.match(numbers)) {

    } else {
        document.getElementById("pwder").innerHTML = " password must contain number"
        return false;

    }

    // Validate length
    if (pwd.value.length >= 8) {

    } else {
        document.getElementById("pwder").innerHTML = "password should be up to 8 latter"
        return false;
    }
    if (pass != repass) {
        document.getElementById("pwder").innerHTML = " password and conform password are not same"
        return false;
    }
else{
        document.getElementById('pwder').innerHTML = null;
        document.getElementById("submit").disabled = false;
        return true;
    }



}




async function validatepassedit() {
    document.getElementById("submit").disabled = true;
    var pass = document.getElementById("pwd").value;
    var repass = document.getElementById("repwd").value;
    var namech = validatename()
    var emailch = validateemail()
    console.log(namech);
    console.log(emailch);




    var lowerCaseLetters = /[a-z]/g;
    if (repwd.value.match(lowerCaseLetters)) {

    }
     else {
        document.getElementById("pwder").innerHTML = " Password must contain lowercase latter"
        return false;

    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (repwd.value.match(upperCaseLetters)) {

    } else {
        document.getElementById("pwder").innerHTML = "password must contain capital latter"
        return false;

    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (repwd.value.match(numbers)) {

    } else {
        document.getElementById("pwder").innerHTML = " password must contain number"
        return false;

    }

    // Validate length
    if (repwd.value.length <= 8) {
        document.getElementById("pwder").innerHTML = "password should be up to 8 latter"
        return false;
    } 
     else {
        document.getElementById('pwder').innerHTML = null;
        document.getElementById("submit").disabled = false;
        return true;
    }
   



}







