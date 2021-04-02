$(document).ready(function () {
    // set todays date
    var today = moment().format('dddd, Do of MMMM')
    document.getElementById("currentDay").innerText = today;
    // Check for saved data to be used once loaded
    onLoad()
    function onLoad() {
        // Create each of the timeblocks
        for (let i = 9; i <= 17; i++) {
            var container = document.getElementById('day')
            var div = document.createElement("div")
            var span = document.createElement('span')
            var textArea = document.createElement('textarea')
            var button = document.createElement('button')
            var img = document.createElement('img')
            var time = i
            if (time < 12) {
                time = `${time}am`
            }
            if (time == 12) {
                time = `${time}pm`
            } if (time > 12) {
                time = `${time -12}pm`
            }
            span.textContent = time
            textArea.id = `${i}text`
            button.className = 'save'
            img.src = './save.svg'
            img.id = i
            button.id = i
            button.appendChild(img)
            div.className = "timeBlock";
            div.appendChild(span)
            div.appendChild(textArea)
            div.appendChild(button)
            container.appendChild(div)
        }
        for (let i = 8; i < 18; i++) {
            if (localStorage.getItem(i) != null) {
                document.getElementById(`${i}text`).innerText = (localStorage.getItem(i))
            }
        }
    }
    // Update coloured codes for past present and future hours
    x = setInterval(function() {
        var currentHour = moment().format('H')
        document.getElementById(`${currentHour}text`).style.backgroundColor = "lightpink";
        for (let i = 9; i < moment().format('H'); i++) {
            document.getElementById(`${i}text`).style.backgroundColor = "grey";
        }
    }, 100);
    // Save button to save hour inputs individually
    $(".save").click(function (e) { 
        e.preventDefault();
        var element = e.target;
        var hour = element.getAttribute("id")
        var text = document.getElementById(`${hour}text`).value
        localStorage.setItem(hour, text)
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