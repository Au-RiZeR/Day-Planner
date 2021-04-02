$(document).ready(function () {
    // set todays date
    var today = moment().format('dddd, Do of MMMM');
    document.getElementById("currentDay").innerText = today;
    var startOfDay = localStorage.getItem('beginHour');
    var endOfDay = localStorage.getItem('endHour');
    var container = document.getElementById('day');
    if (!startOfDay || !endOfDay) {
        startOfDay = 8;
        endOfDay = 17;
    }
    // Dropdowns to choose hours of day
    $("select").change(function (e) {
        e.preventDefault();
        startOfDay = document.getElementById("begin").value;
        endOfDay = document.getElementById("end").value;
        localStorage.setItem('beginHour', startOfDay);
        localStorage.setItem('endHour', endOfDay);
        setDay();
    });
    // to run upon loading the page
    onLoad();
    function onLoad() {
        for (let i = 1; i <= 24; i++) {
            var begin = document.getElementById('begin');
            var end = document.getElementById('end');
            var option1 = document.createElement('option');
            var option2 = document.createElement('option');
            option1.value = i;
            option1.textContent = i;
            option2.value = i;
            option2.textContent = i;
            begin.appendChild(option1);
            end.appendChild(option2);
        }
        $('#begin').val(startOfDay);
        $('#end').val(endOfDay);
        setDay();
    }
    // Function to be run when updating hours of day
    function setDay() {
        container.innerHTML = '';
        for (let i = Number(startOfDay); i <= Number(endOfDay); i++) {
            var div = document.createElement("div");
            var span = document.createElement('span');
            var textArea = document.createElement('textarea');
            var button = document.createElement('button');
            var img = document.createElement('img');
            var time = i;
            if (time < 12) {
                time = `${time}am`;
            }
            if (time == 12) {
                time = `${time}pm`;
            } if (time > 12 && time != 24) {
                time = `${time - 12}pm`;
            } if (time == 24) {
                time = `${time}am`;
            }
            span.textContent = time;
            textArea.id = `${i}text`;
            button.className = 'save';
            img.src = './save.svg';
            img.id = i;
            button.id = Number(i);
            button.appendChild(img);
            div.className = "timeBlock";
            div.appendChild(span);
            div.appendChild(textArea);
            div.appendChild(button);
            container.appendChild(div);
        }
        for (let i = Number(startOfDay); i < Number(endOfDay); i++) {
            if (localStorage.getItem(i) != null) {
                document.getElementById(`${i}text`).innerText = (localStorage.getItem(i));
            }
        }
        // Save button to save hour inputs individually
        $(".save").click(function (e) {
            e.preventDefault();
            var element = e.target;
            var hour = element.getAttribute("id");
            var text = document.getElementById(`${hour}text`).value;
            localStorage.setItem(hour, text);
        });
    }
    // Update coloured codes for past present and future hours
    x = setInterval(function () {
        var currentHour = moment().format('H');
        if (document.getElementById(`${currentHour}text`) != null) {
            document.getElementById(`${currentHour}text`).style.backgroundColor = "lightpink";
        }
        for (let i = Number(startOfDay); i < currentHour; i++) {
            let item = document.getElementById(`${i}text`);
            if (item != null) {
                item.style.backgroundColor = "grey";
            }
        }
    }, 100);
    // Clear storage and all day planned cells
    $("#clear").click(function (e) {
        e.preventDefault();
        for (let i = 1; i < 24; i++) {
            let item = document.getElementById(`${i}text`);
            localStorage.removeItem(i);
            if (item != null) {
                item.value = "";
            }
        }
    });
});