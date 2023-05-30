var date = 0;
var interval;

var started = false;
var headings = document.getElementsByTagName("h4");
var cards = document.getElementsByClassName("time-mode");

document.getElementById("start").addEventListener('click', (e) => {
    if (started == false) {
        start();
    } else {
        stop();
    }
})

// start or resumes the time
function start() {
    interval = setInterval(() => {
        updateTime();
    }, 10);
    for (var i = 0; i < headings.length; i++) {
        headings[i].classList.add("move-down");
    }
    for (var i = 0; i < headings.length; i++) {
        cards[i].classList.add("time-mode-circle");
    }
    setById("start", "Pause");
    started = true;
}

// pauses the time
function stop() {
    clearInterval(interval);
    for (var i = 0; i < headings.length; i++) {
        headings[i].classList.remove("move-down");
    }
    for (var i = 0; i < headings.length; i++) {
        cards[i].classList.remove("time-mode-circle");
    }
    setById("start", "Start");
    started = false;
}

// reset time and remove elements inside list
function reset() {
    date = 0;
    updateTime();
    document.getElementById("lap-list").innerHTML = '';

}

function updateTime() {
    var div = 1;
    var val = parseInt(date / div) % 100;
    if (val < 10) val = "0" + val;
    setById("milli", val);
    div *= 100;
    val = parseInt(date / div) % 60;
    if (val < 10) val = "0" + val;
    setById("sec", val);
    div *= 60;
    val = parseInt(date / div) % 60;
    if (val < 10) val = "0" + val;
    setById("min", val);
    date++;
}


function setById(id, val) {
    document.getElementById(id).innerHTML = val;
}

document.getElementById("lap").addEventListener('click', () => {
    addTimeToLap();
});


// add the current time to lap
function addTimeToLap() {
    if (started == false) return;
    var div = 1;
    var mill = parseInt(date / div) % 100;
    if (mill < 10) mill = "0" + mill;
    div *= 100;
    var sec = parseInt(date / div) % 60;
    if (sec < 10) sec = "0" + sec;
    div *= 60;
    var min = parseInt(date / div) % 60;
    if (min < 10) min = "0" + min;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(`${min} Minutes ${sec} Seconds and ${mill} Milliseconds`));
    document.getElementById("lap-list").prepend(li);
}

// reset time and remove every lap
document.getElementById("reset").addEventListener('click', () => {
    stop();
    reset();
});



// theme
var isLightThem = true;
var r = document.querySelector(':root');
document.getElementById('theme-icon').addEventListener('click', () => {
    if (isLightThem) {
        darkTheme();
    } else {
        lightTheme();
    }
});
function darkTheme() {
    r.style.setProperty('--primary-color', '#57CC99');
    r.style.setProperty('--secondary-color', '#C7F9CC');
    r.style.setProperty('--selected-button', '#38A3A5');
    isLightThem = false;
}

function lightTheme() {
    r.style.setProperty('--primary-color', '#041C32');
    r.style.setProperty('--secondary-color', '#064663');
    r.style.setProperty('--selected-button', '#04293A');
    isLightThem = true;
}