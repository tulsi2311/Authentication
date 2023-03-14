let ele1 = document.getElementById("1");

    ele1.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
    let ele2 = document.getElementById("2");

    ele2.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
    let ele3 = document.getElementById("3");

    ele3.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
    let ele4 = document.getElementById("4");

    ele4.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
    let ele5 = document.getElementById("5");

    ele5.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
    let ele6 = document.getElementById("6");
    ele6.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
    let ele7 = document.getElementById("7");

    ele7.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
    let ele8 = document.getElementById("8");

    ele8.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
    let ele9 = document.getElementById("9");

    ele9.addEventListener('contextmenu', (ev)=>{
      console.log("Right click disabled");
      ev.preventDefault();
    });
function tulsi_X(x,id)
 { 
    if(document.getElementById(id).innerHTML=="X"||document.getElementById(id).innerHTML=="O")
    {
        return 0;
    }
   var n = parseInt(x.id)
   for (var i=0;i<10;i++)
   {
     if(n==i)
     {
       x.innerHTML="X"
       document.getElementById("move").innerHTML="player O turn";
     }
   }

 }
function tulsi_O(o,id)
{
    if(document.getElementById(id).innerHTML=="X"||document.getElementById(id).innerHTML=="O")
    {
        return 0;
    }
  var n = parseInt(o.id)
  for (var i=0;i<10;i++)
  {
    if(n==i)
 {
   o.innerHTML="O"
   document.getElementById("move").innerHTML="player X turn";
 }
}

}
 function tulsi_reset()
 { var tulsi_idx1=document.getElementById("1").innerText=""
   var tulsi_idx2=document.getElementById("2").innerHTML=""
   var tulsi_idx3=document.getElementById("3").innerHTML=""
   var tulsi_idx4=document.getElementById("4").innerHTML=""
   var tulsi_idx5=document.getElementById("5").innerHTML=""
   var tulsi_idx6=document.getElementById("6").innerHTML=""
   var tulsi_idx7=document.getElementById("7").innerHTML=""
   var tulsi_idx8=document.getElementById("8").innerHTML=""
   var tulsi_idx9=document.getElementById("9").innerText=""
   //var tulsi_idx9=document.getElementById("out").innerText=""

 } var countforo = 0;
 var countforx =0;
function tulsi_mainfunction()
 { 
   var tulsi_idx1=document.getElementById("1").innerText
   var tulsi_idx2=document.getElementById("2").innerText
   var tulsi_idx3=document.getElementById("3").innerText
   var tulsi_idx4=document.getElementById("4").innerText
   var tulsi_idx5=document.getElementById("5").innerText
   var tulsi_idx6=document.getElementById("6").innerText
   var tulsi_idx7=document.getElementById("7").innerText
   var tulsi_idx8=document.getElementById("8").innerText
   var tulsi_idx9=document.getElementById("9").innerText
 
   if(tulsi_idx1=="X" && tulsi_idx2=="X" && tulsi_idx3=="X")
   {
    countforx=countforx+1;
    document.getElementById("out1").innerHTML="Winner is player X For "+countforx+" time"; 
    setTimeout(tulsi_reset,1000);
   }
   else if(tulsi_idx4=="X" && tulsi_idx5=="X" && tulsi_idx6=="X")
   {
    countforx=countforx+1;
    document.getElementById("out1").innerHTML="Winner is player X For "+countforx+" time"; 
    setTimeout(tulsi_reset,1000);
   }
   else if(tulsi_idx7=="X" && tulsi_idx8=="X" && tulsi_idx9=="X")
   {
    countforx=countforx+1;
    document.getElementById("out1").innerHTML="Winner is player X For "+countforx+" time"; 
    setTimeout(tulsi_reset,1000);
   }
   else if(tulsi_idx1=="X" && tulsi_idx4=="X" && tulsi_idx7=="X")
   {
    countforx=countforx+1;
    document.getElementById("out1").innerHTML="Winner is player X For "+countforx+" time"; 
    setTimeout(tulsi_reset,1000);
   }
   else if(tulsi_idx2=="X" && tulsi_idx5=="X" && tulsi_idx8=="X")
   {
    countforx=countforx+1;
    document.getElementById("out1").innerHTML="Winner is player X For "+countforx+" time"; 
    setTimeout(tulsi_reset,1000);
   }
   else if(tulsi_idx3=="X" && tulsi_idx6=="X" && tulsi_idx9=="X")
   {
    countforx=countforx+1;
    document.getElementById("out1").innerHTML="Winner is player X For "+countforx+" time"; 
    setTimeout(tulsi_reset,1000);
   }
   else if(tulsi_idx1=="X" && tulsi_idx5=="X" && tulsi_idx9=="X")
   {
    countforx=countforx+1;
    document.getElementById("out1").innerHTML="Winner is player X For "+countforx+" time"; 
    setTimeout(tulsi_reset,1000);
   }
   else if(tulsi_idx3=="X" && tulsi_idx5=="X" && tulsi_idx7=="X")
   {
    countforx=countforx+1;
    document.getElementById("out1").innerHTML="Winner is player X For "+countforx+" time"; 
    setTimeout(tulsi_reset,1000);
    
   }

 else if(tulsi_idx3=="O" && tulsi_idx5=="O" && tulsi_idx7=="O")
 {
  countforo=countforo+1;
  document.getElementById("out").innerHTML="Winner is player O For "+countforo+" time"; 
  setTimeout(tulsi_reset,1000);
  
 }

else if(tulsi_idx1=="O" && tulsi_idx5=="O" && tulsi_idx9=="O")
  {
   countforo=countforo+1;
   document.getElementById("out").innerHTML="Winner is player O for "+countforo+" time";
   setTimeout(tulsi_reset,1000);
  }
else if(tulsi_idx6=="O" && tulsi_idx5=="O" && tulsi_idx4=="O")
  {
   countforo=countforo+1;
   document.getElementById("out").innerHTML="Winner is player O For "+countforo+" time"; 
   setTimeout(tulsi_reset,1000);
  }
 else if(tulsi_idx3=="O" && tulsi_idx2=="O" && tulsi_idx1=="O")
  {
   countforo=countforo+1;
   document.getElementById("out").innerHTML="Winner is player O For "+countforo+" time"; 
   setTimeout(tulsi_reset,1000);
  }
  else if(tulsi_idx8=="O" && tulsi_idx9=="O" && tulsi_idx7=="O")
  {
   countforo=countforo+1;
   document.getElementById("out").innerHTML="Winner is player O For "+countforo+" time"; 
   setTimeout(tulsi_reset,1000);
  }
  else if(tulsi_idx1=="O" && tulsi_idx4=="O" && tulsi_idx7=="O")
  {
   countforo=countforo+1;
   document.getElementById("out").innerHTML="Winner is player O For "+countforo+" time"; 
   setTimeout(tulsi_reset,1000);
  }
  else if(tulsi_idx3=="O" && tulsi_idx6=="O" && tulsi_idx9=="O")
  {
   countforo=countforo+1;
   document.getElementById("out").innerHTML="Winner is player O For "+countforo+" time"; 
   setTimeout(tulsi_reset,1000);
  }
  else if(tulsi_idx2=="O" && tulsi_idx5=="O" && tulsi_idx8=="O")
  {
   countforo=countforo+1;
  document.getElementById("out").innerHTML="Winner is player O For "+countforo+" time"; 
  setTimeout(tulsi_reset,1000);
  }
   else {
    if((tulsi_idx1=="X"||tulsi_idx1=="O")&&(tulsi_idx2=="X"||tulsi_idx2=="O")&&(tulsi_idx3=="X"||tulsi_idx3=="O")&&(tulsi_idx4=="X"||tulsi_idx4=="O")&&(tulsi_idx5=="X"||tulsi_idx5=="O")&&(tulsi_idx6=="X"||tulsi_idx6=="O")&&(tulsi_idx7=="X"||tulsi_idx7=="O")&&(tulsi_idx8=="X"||tulsi_idx8=="O")&&(tulsi_idx9=="X"||tulsi_idx9=="O")){

  alert("tai")
  }
   }
 }
