var startDate =  new Date(document.querySelector(".stDate").value)
var  month =startDate.getMonth()+1;
if(startDate.getMonth()<9){
    month="0"+month;
}
document.getElementById("inline16").value=startDate.getFullYear()+"-"+month+"-"+startDate.getDate();
console.log(document.getElementById("inline16").value);