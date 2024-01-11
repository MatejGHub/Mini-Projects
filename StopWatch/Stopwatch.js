let startBtn = document.getElementsByClassName("start")[0];
let stopBtn = document.getElementsByClassName("stop")[0];
let resetBtn = document.getElementsByClassName("reset")[0];
let lapBtn = document.getElementsByClassName("lap")[0];

let hoursEl = document.getElementById("hours");
let minutesEl = document.getElementById("minutes");
let secondsEl = document.getElementById("seconds");
let millisecondsEl = document.getElementById("milliseconds");

let time = 0;
let interval;

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let isTimerRunning = false;

let title = document.getElementsByTagName("title")[0];

let lapsDiv = document.getElementsByClassName("laps")[0];
let lapList = document.getElementsByClassName("lap-list")[0];
let lapCounter = 0;

hoursEl.innerHTML = "00";
minutesEl.innerHTML = "00";
secondsEl.innerHTML = "00";
millisecondsEl.innerHTML = "00";

let containerStopwatch = document.querySelector(".container-stopwatch");
let containerCountdown = document.querySelector(".container-countdown");

let stopwatchBtn = document.querySelector("#stopwatch");
let countdownBtn = document.querySelector("#countdown");

let inputFields = document.querySelectorAll("input");
let startCountdownBtn = document.querySelector(".accept-time");
let showTimeHours = document.querySelector("#hours-countdown");
let showTimeMinutes = document.querySelector("#minutes-countdown");
let showTimeSeconds = document.querySelector("#seconds-countdown");
let showTimeMilliseconds = document.querySelector("#milliseconds-countdown");
let countDown;
let timeLeft;
let hoursValue;
let minutesValue;
let secondsValue;
let newHours;
let newMinutes;
let newSeconds;

startBtn.addEventListener("click", () => {
  startTimer();
});

stopBtn.addEventListener("click", () => {
  stopTimer();
});

resetBtn.addEventListener("click", () => {
  resetTimer();
});

lapBtn.addEventListener("click", () => {
  countLaps();
});

window.addEventListener("beforeunload", () => {
  saveCountdown();
  saveTime();
  saveLaps();
});

window.onload = () => {
  loadTimer();
  loadLaps();
  stopwatchBtn.classList.add("active");
};

stopwatchBtn.addEventListener("click", () => {
  showStopwatch();
});

countdownBtn.addEventListener("click", () => {
  showCountdown();
});

startCountdownBtn.addEventListener("click", () => {
  let hoursValue = Number(inputFields[0].value);
  let minutesValue = Number(inputFields[1].value);
  let secondsValue = Number(inputFields[2].value);

  if (hoursValue == "" && minutesValue == "" && secondsValue == "") {
    updateDisplay(0, 0, 0);
    startCountdownBtn.innerHTML = "Start Timer";
  } else {
    startCountdownBtn.innerHTML = "Stop Timer";
    updateDisplay(hoursValue, minutesValue, secondsValue);
  }

  inputFields.forEach((inputField) => {
    inputField.value = "";
  });

  let timeLeft = convertToSeconds(hoursValue, minutesValue, secondsValue);

  clearInterval(countDown);

  countDown = setInterval(() => {
    timeLeft--;

    let newHours = Math.floor(timeLeft / 3600);
    let newMinutes = Math.floor((timeLeft % 3600) / 60);
    let newSeconds = Math.floor(timeLeft % 60);

    updateDisplay(newHours, newMinutes, newSeconds);

    if (timeLeft <= 0) {
      clearInterval(countDown);
      updateDisplay(0, 0, 0);
      startCountdownBtn.innerHTML = "Start Timer";
    }
  }, 1000);
});

inputFields.forEach(function (inputField) {
  inputField.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");

    if (this.value.length > 2) {
      this.value = this.value.slice(0, 2);
    }
    if (parseInt(this.value, 10) > 59) {
      this.value = "59";
    }
  });
});
//

//KeyCodes
document.addEventListener("keydown", (event) => {
  keyCodesStopwatch();
  keyCodesCountdown();
});

//Start Timer Function
function startTimer() {
  if (!isTimerRunning) {
    interval = setInterval(activateTimer, 10);
    isTimerRunning = true;
    lapBtn.classList.remove("disabled");
  }
}

//Stop Timer Function
function stopTimer() {
  clearInterval(interval);
  isTimerRunning = false;
  lapBtn.classList.add("disabled");
}

//Reset Timer Function
function resetTimer() {
  clearInterval(interval);
  isTimerRunning = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  hoursEl.innerHTML = "00";
  minutesEl.innerHTML = "00";
  secondsEl.innerHTML = "00";
  millisecondsEl.innerHTML = "00";
  lapsDiv.classList.remove("active");
  lapList.innerHTML = "";
  lapCounter = 0;
  lapBtn.classList.add("disabled");
}

//Lap Counter Function
function countLaps() {
  if (isTimerRunning) {
    if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) {
      return;
    } else {
      lapCounter++;
      lapsDiv.classList.add("active");
      let lapTime = document.createElement("li");
      lapTime.innerHTML = `
        <div class="lap-item">
          <div class="lap-number">${lapCounter} Lap:</div>
          <div class="lap-time">
            ${String(hours).padStart(2, "0")}
            :${String(minutes).padStart(2, "0")}
            :${String(seconds).padStart(2, "0")}
            :${String(milliseconds).padStart(2, "0")}
          </div>
        </div>
      `;
      lapList.appendChild(lapTime);
      lapList.scrollTop = lapList.scrollHeight;
    }
  } else {
    return;
  }
}

//Save Timer Values
function saveTime() {
  const timerValues = {
    hours,
    minutes,
    seconds,
    milliseconds
  };
  localStorage.setItem("timerValues", JSON.stringify(timerValues));
}

//Load Timer Values
function loadTimer() {
  const timerValues = JSON.parse(localStorage.getItem("timerValues"));

  if (timerValues) {
    hours = timerValues.hours;
    minutes = timerValues.minutes;
    seconds = timerValues.seconds;
    milliseconds = timerValues.milliseconds;
    hoursEl.innerHTML = String(hours).padStart(2, "0");
    minutesEl.innerHTML = String(minutes).padStart(2, "0");
    secondsEl.innerHTML = String(seconds).padStart(2, "0");
    millisecondsEl.innerHTML = String(milliseconds).padStart(2, "0");
  }
}

//Save Lap Values
function saveLaps() {
  const lapListHTML = lapList.innerHTML;
  localStorage.setItem("lapListHTML", lapListHTML);
}

//Load Lap Values
function loadLaps() {
  const lapListHTML = localStorage.getItem("lapListHTML");

  if (lapListHTML) {
    lapList.innerHTML = lapListHTML;
    lapCounter = lapList.childElementCount;
    lapsDiv.classList.add("active");
    lapList.scrollTop = lapList.scrollHeight;
  }
}

//Activate Timer Function
const activateTimer = () => {
  milliseconds++;
  millisecondsEl.innerHTML = String(milliseconds).padStart(2, "0");
  if (milliseconds > 99) {
    seconds++;
    secondsEl.innerHTML = String(seconds).padStart(2, "0");
    milliseconds = 0;
    millisecondsEl.innerHTML = "00";
  }
  if (seconds > 59) {
    minutes++;
    minutesEl.innerHTML = String(minutes).padStart(2, "0");
    seconds = 0;
    secondsEl.innerHTML = "00";
  }
  if (minutes > 59) {
    hours++;
    hoursEl.innerHTML = String(hours).padStart(2, "0");
    minutes = 0;
    minutesEl.innerHTML = "00";
  }
};

//KeyCodes stopwatch Function
function keyCodesStopwatch() {
  if (event.keyCode === 32) {
    event.preventDefault();
    startTimer();
  }
  if (event.keyCode === 27) {
    stopTimer();
  }
  if (event.keyCode === 13) {
    countLaps();
  }
  if (event.keyCode === 82) {
    resetTimer();
  }
}

//KeyCodes Countdown Function
function keyCodesCountdown() {
  if (event.keyCode === 32) {
    event.preventDefault();
    startCountdownBtn.click();
  }
}

//Shows Stopwatch
function showStopwatch() {
  containerStopwatch.classList.remove("disable");
  stopwatchBtn.classList.add("active");
  containerCountdown.classList.remove("active");
  countdownBtn.classList.remove("active");
}

//Show Countdown
function showCountdown() {
  containerStopwatch.classList.add("disable");
  stopwatchBtn.classList.remove("active");
  containerCountdown.classList.add("active");
  countdownBtn.classList.add("active");
}

//formatTime to show 00
function formatTime(value) {
  return value.toString().padStart(2, "0");
}

//Convert to seconds
function convertToSeconds(hours, minutes, seconds) {
  return hours * 3600 + minutes * 60 + seconds;
}

//update Display
function updateDisplay(hours, minutes, seconds) {
  showTimeHours.innerHTML = formatTime(hours);
  showTimeMinutes.innerHTML = formatTime(minutes);
  showTimeSeconds.innerHTML = formatTime(seconds);
}
