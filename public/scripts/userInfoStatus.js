  var package = document.querySelector(".pkg").value ; 
  var startingDate = new Date(document.querySelector(".stDate").value);
  var endingDate = new Date(document.querySelector(".enDate").value);
 
  var todayDate = new Date();
  var remainingMonths = endingDate.getMonth() - todayDate.getMonth();
  if(endingDate.getFullYear()>startingDate.getFullYear()){
    remainingMonths=remainingMonths+12;
  }
 
  var remainingDays = (30+startingDate.getDate()-todayDate.getDate());
  if(remainingMonths/package*100<25){
    document.querySelector(".status-bar").style.backgroundColor="red";
  }
  if(remainingMonths/package*100>25){
    document.querySelector(".status-bar").style.backgroundColor="#f6830f";
  }
  if(remainingMonths/package*100>50){
    document.querySelector(".status-bar").style.backgroundColor="#ffd31d";
  }
  if( remainingMonths/package*100>75){

    document.querySelector(".status-bar").style.backgroundColor="#79d70f";
  }
  if( todayDate.getFullYear() < startingDate.getFullYear()) {
    document.querySelector(".status-content").innerHTML="Session not started Yet";
    document.querySelector(".status-bar").style.background="green";
  }
  if(todayDate.getMonth() < startingDate.getMonth() &&  todayDate.getDate() < startingDate.getDate()){
    document.querySelector(".status-content").innerHTML="Session not started Yet";
    document.querySelector(".status-bar").style.background="green";
  }
  
  else{
    if(remainingMonths > 1){
      if(remainingDays>=30){
        document.querySelector(".status-content").innerHTML=remainingMonths+" Months ," + (remainingDays-30) +" Days remaining";
      }
      else{
        document.querySelector(".status-content").innerHTML=remainingMonths-1+" Months ," + remainingDays +" Days remaining";
      }
      
    }
    if(remainingMonths ===1){
      document.querySelector(".status-content").innerHTML=30+startingDate.getDate()-todayDate.getDate() + " Days remaining";
    }
    
      if(todayDate.getFullYear()<endingDate.getFullYear()){
         remainingMonths = remainingMonths;
      }
      else if(remainingMonths <= 0){
        document.querySelector(".status-content").innerHTML="Session has ended";
        document.querySelector(".status-bar").style.backgroundColor="red";
        document.querySelector(".status-bar").style.opacity=1;
        console.log("session ended");
      }
  
    
  }

  

