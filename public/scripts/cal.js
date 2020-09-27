//Calculate Tip
function calculateBmi() {
  var kg = document.getElementById("w").value;
  var sex = document.getElementById("GENDER").value;
  var cm = document.getElementById("h").value;

  //validate input
  if (kg === "" || cm === "" ) {
    alert("Please enter values");
    return;
  }


  var total =  (kg*10000)/(cm*cm);
  total = total.toFixed(2);
  if(total<18.5){
    document.getElementById("each").innerHTML = "You are Underweight";
  }
  else if (total>24.9) {
        document.getElementById("each").innerHTML = "You are Overweight";
  }
  else {
        document.getElementById("each").innerHTML = "Your BMI is Normal";
  }


  document.getElementById("result").style.display = "block";
  document.getElementById("bmi").innerHTML = total;

}

//Hide the tip amount on load
document.getElementById("result").style.display = "none";


//click to call function
document.getElementById("calculate").onclick = function() {
  calculateBmi();

};
