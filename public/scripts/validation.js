var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");

function validation(){
    if(password.value != confirm_password.value){
        confirm_password.setCustomValidity("Password do not match !!");
    }
    else{
        confirm_password.setCustomValidity("");
    }
}
password.onchange =validation;
confirm_password.onkeyup = validation;