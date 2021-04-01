$(document).ready(function () {
    // set todays date
    var today = moment().format('dddd, Do of MMMM')
    console.log(localStorage)
    document.getElementById("currentDay").innerText = today;
    // Check for saved data to be used once loaded
    onLoad()
    function onLoad() {
        for (let i = 8; i < 18; i++) {
            if (localStorage.getItem(i) != null) {
                document.getElementById(`${i}text`).innerText = (localStorage.getItem(i))
            }
        }
    }
    // Update coloured codes for past present and future hours
    x = setInterval(function() {
        var currentHour = moment().format('HH')
        document.getElementById(`${currentHour}text`).style.backgroundColor = "green";
        for (let i = 9; i < moment().format('HH'); i++) {
            document.getElementById(`${i}text`).style.backgroundColor = "grey";
        }
    }, 100);
    // Save button to save hour inputs individually
    $(".save").click(function (e) { 
        e.preventDefault();
        var element = e.target;
        var hour = element.getAttribute("id")
        var text = document.getElementById(`${hour}text`).value
        console.log(text)
        console.log(hour)
        localStorage.setItem(hour, text)
        console.log(localStorage)
    });
    // Clear storage and all day planned cells
    $("#clear").click(function (e) { 
        e.preventDefault();
        localStorage.clear();
        for (let i = 9; i < 18; i++) {
                document.getElementById(`${i}text`).value = "";
        }
    });
});