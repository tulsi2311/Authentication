var test = 0;
var count = 2
function MyFunction(){
const x=document.createElement("table")
const y=document.createElement("tbody")
x.setAttribute("id","table1")
for(var i=0; i<count; i++){
const row=document.createElement("tr")
for(var j=0; j<count; j++){
const colume=document.createElement("td")
const text=document.createTextNode(" ")
colume.appendChild(text)
row.appendChild(colume)
}
y.appendChild(row)
}
var trans = '0.8'
var color_table = 'rgba(';
for (var i = 0; i < 3; i++) {
color_table += Math.floor(Math.random() * 255) + ',';
}
color_table += trans + ')';

x.style.backgroundColor = color_table
x.appendChild(y)
document.body.appendChild(x)

console.log(color_table)

var trans = '0.5'
var color_data = 'rgba(';
for (var i = 0; i < 3; i++) {
color_data += Math.floor(Math.random() * 255) + ',';
}
color_data += trans + ')';

const tulsi_array = document.getElementsByTagName("td")
var tulsi_result = tulsi_array[Math.floor(Math.random()*tulsi_array.length)]
tulsi_result.style.backgroundColor = color_data
tulsi_result.addEventListener("click",()=>{
x.innerHTML = ""
x.remove()
count = count + 1
test=test+1;
document.getElementById("score").innerHTML=test;
MyFunction()

})
}


function timer(){

let seconds = 10;
const makeIteration = () => {
console.clear();
if (seconds >=0) {
var time= document.getElementById("timer").innerHTML=seconds
//console.log(seconds);
setTimeout(makeIteration, 1000); // 1 second waiting
}
else{

    alert("game over Your Score is : "+test)
    location.reload()
    var reset= document.getElementById("table1");
    reset.remove();
   
    var test1= document.getElementById("score").innerHTML="";
    setTimeout(test1,10500)
    }
    seconds -= 1;
}

setTimeout(makeIteration, 1000);
//var time= document.getElementById("timer").innerHTML=seconds
}