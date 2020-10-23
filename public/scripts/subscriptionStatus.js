var package = document.querySelector(".pkg1").value ; 
var id1 = document.querySelector(".id1").value ; 
var startingDate = new Date(document.querySelector(".stDate1").value);
var endingDate = new Date(document.querySelector(".enDate1").value);

var todayDate = new Date();
console.log("Starting date = "+startingDate.getDate()+"-"+(startingDate.getMonth()+1)+"-"+startingDate.getFullYear());
console.log("today date = "+todayDate.getDate()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getFullYear());
console.log("ending date = "+endingDate.getDate()+"-"+(endingDate.getMonth()+1)+"-"+endingDate.getFullYear());
console.log(package);
var remainingMonths = endingDate.getMonth() - todayDate.getMonth();
if(endingDate.getFullYear()>startingDate.getFullYear()){
  remainingMonths=remainingMonths+12;
}

var remainingDays = (30+startingDate.getDate()-todayDate.getDate());
if(remainingMonths/package*100<25){
  document.querySelector(".percentage-bar-container"+id1).style.backgroundColor="red";
}
if(remainingMonths/package*100>25){
  document.querySelector(".percentage-bar-container"+id1).style.backgroundColor="#f6830f";
}
if(remainingMonths/package*100>50){
  document.querySelector(".percentage-bar-container"+id1).style.backgroundColor="#ffd31d";
}
if( remainingMonths/package*100>75){

  document.querySelector(".percentage-bar-container"+id1).style.backgroundColor="#79d70f";
}
console.log("remaining months = "+ remainingMonths);
console.log("remaining Days = " +remainingDays);
if( todayDate.getFullYear() < startingDate.getFullYear()) {
//   document.querySelector(".status-content").innerHTML="Session not started Yet";
//   document.querySelector(".status-bar").style.background="green";
}
if(todayDate.getMonth() < startingDate.getMonth() &&  todayDate.getDate() < startingDate.getDate()){
//   document.querySelector(".status-content").innerHTML="Session not started Yet";
//   document.querySelector(".status-bar").style.background="green";
}

else{
  if(remainingMonths > 1){
    if(remainingDays>=30){
    //   document.querySelector(".status-content").innerHTML=remainingMonths+" Months ," + (remainingDays-30) +" Days";
    }
    else{
    //   document.querySelector(".status-content").innerHTML=remainingMonths-1+" Months," + remainingDays +" Days";
    }
    
  }
  if(remainingMonths ===1){
    // document.querySelector(".status-content").innerHTML=30+startingDate.getDate()-todayDate.getDate() + " Days";
  }
  
    if(todayDate.getFullYear()<endingDate.getFullYear()){
       remainingMonths = remainingMonths;
    }
    else if(remainingMonths <= 0){
    //   document.querySelector(".status-content").innerHTML="Session has ended";
      document.querySelector(".percentage-bar-container"+id1).style.backgroundColor="red";
      document.querySelector(".percentage-bar-container"+id1).style.opacity=1;
      console.log("session ended");
    }

  
}
console.log(remainingDays);



