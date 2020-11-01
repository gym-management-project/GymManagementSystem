  exports.endDate = 
function (stDate,package){
 
    var startingDate = new Date(stDate);
    const startingDateMonthUpdated = startingDate.getMonth();
    const startingDateDayUpdated = startingDate.getDate();
    const startingDateYearUpdated = startingDate.getFullYear();
    const pack = parseInt(package,10);
    let endingDateYearUpdated = startingDateYearUpdated;
    let endingDateMonthUpdated = startingDateMonthUpdated+pack +0;
      if(endingDateMonthUpdated>12){
        endingDateMonthUpdated = endingDateMonthUpdated%12;
        endingDateYearUpdated=endingDateYearUpdated+1;
        console.log("occur");
    }
    else{
      endingDateMonthUpdated=endingDateMonthUpdated;
    }
    const endingDateUpdated = new Date(endingDateYearUpdated,endingDateMonthUpdated,startingDateDayUpdated);
    return endingDateUpdated;
}