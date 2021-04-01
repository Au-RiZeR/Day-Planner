$(document).ready(function () {
    
    var today = moment().format('dddd, Do of MMMM')
    var currentHour = moment().format('HH')

    document.getElementById("currentDay").innerText = today;


    timeUpdate()
    function timeUpdate() {
        document.getElementById(`${currentHour}text`).style.backgroundColor = "green";
        for (let i = 9; i < moment().format('HH'); i++) {
            document.getElementById(`${i}text`).style.backgroundColor = "grey";
        }
    }












});