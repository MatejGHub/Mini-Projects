let autoPlay = document.querySelector("#auto-play");
let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector("#scissors");
let result = document.querySelector("#result");
let choicePlayer = document.querySelector("#choice-player");
let choiceComputer = document.querySelector("#choice-computer");
let win = document.querySelector("#win");
let lose = document.querySelector("#lose");
let tie = document.querySelector("#tie");
let winCount = localStorage.getItem("winCount")
  ? parseInt(localStorage.getItem("winCount"))
  : 0;
let loseCount = localStorage.getItem("loseCount")
  ? parseInt(localStorage.getItem("loseCount"))
  : 0;
let tieCount = localStorage.getItem("tieCount")
  ? parseInt(localStorage.getItem("tieCount"))
  : 0;
tie.innerHTML = tieCount;
win.innerHTML = winCount;
lose.innerHTML = loseCount;
let resetScore = document.querySelector("#reset");
let resetYes = document.querySelector("#reset-yes");
let resetNo = document.querySelector("#reset-no");
let resetSection = document.querySelector(".reset-section");

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) {
    // space
    autoPlayGame();
  } else if (event.keyCode === 82) {
    // r
    playRock();
  } else if (event.keyCode === 80) {
    // p
    playPaper();
  } else if (event.keyCode === 83) {
    // s
    playScissors();
  } else if (event.keyCode === 8 || event.keyCode === 46) {
    resetYesNo(); // reset yes no function
  }
});

autoPlay.addEventListener("click", () => {
  autoPlayGame();
});

rock.addEventListener("click", () => {
  playRock();
});

paper.addEventListener("click", () => {
  playPaper();
});

scissors.addEventListener("click", () => {
  playScissors();
});

resetScore.addEventListener("click", () => {
  resetYesNo();
});

function autoPlayGame() {
  if (autoPlay.innerHTML === "Stop") {
    autoPlay.innerHTML = "Auto Play";
    clearInterval(RPSInterval);
  } else if (autoPlay.innerHTML === "Auto Play") {
    autoPlay.innerHTML = "Stop";
    RPSInterval = setInterval(() => {
      let chooseGame = Math.floor(Math.random() * 3);
      if (chooseGame === 0) {
        playRock();
      } else if (chooseGame === 1) {
        playPaper();
      } else {
        playScissors();
      }
    }, 1000);
  }
}

function resetYesNo() {
  if (loseCount === 0 && winCount === 0 && tieCount === 0) {
    //Do nothing
  } else {
    resetSection.classList.add("active");
    resetYes.addEventListener("click", () => {
      resetAll();
      resetSection.classList.remove("active");
    });
    resetNo.addEventListener("click", () => {
      resetSection.classList.remove("active");
    });
  }
}

function playRock() {
  let randomNumber = randomNum();
  if (randomNumber === 1) {
    result.innerHTML = `It's a tie!`;
    choicePlayer.innerHTML = `Rock`;
    choiceComputer.innerHTML = `Rock`;
    tieCount++;
    tie.innerHTML = tieCount;
    localStorage.setItem("tieCount", tieCount);
  } else if (randomNumber === 2) {
    result.innerHTML = `You lose!`;
    choicePlayer.innerHTML = `Rock`;
    choiceComputer.innerHTML = "Paper";
    loseCount++;
    lose.innerHTML = loseCount;
    localStorage.setItem("loseCount", loseCount);
  } else {
    result.innerHTML = `You win!`;
    choicePlayer.innerHTML = `Rock`;
    choiceComputer.innerHTML = `Scissors`;
    winCount++;
    win.innerHTML = winCount;
    localStorage.setItem("winCount", winCount);
  }
}

function playPaper() {
  let randomNumber = randomNum();
  if (randomNumber === 1) {
    result.innerHTML = `You win!`;
    choicePlayer.innerHTML = `Paper`;
    choiceComputer.innerHTML = `Rock`;
    winCount++;
    win.innerHTML = winCount;
    localStorage.setItem("winCount", winCount);
  } else if (randomNumber === 2) {
    result.innerHTML = `It's a tie`;
    choicePlayer.innerHTML = `Paper`;
    choiceComputer.innerHTML = "Paper";
    tieCount++;
    tie.innerHTML = tieCount;
    localStorage.setItem("tieCount", tieCount);
  } else {
    result.innerHTML = `You lose!`;
    choicePlayer.innerHTML = `Paper`;
    choiceComputer.innerHTML = `Scissors`;
    loseCount++;
    lose.innerHTML = loseCount;
    localStorage.setItem("loseCount", loseCount);
  }
}

function playScissors() {
  let randomNumber = randomNum();
  if (randomNumber === 1) {
    result.innerHTML = `You lose!!`;
    choicePlayer.innerHTML = `Scissors`;
    choiceComputer.innerHTML = `Rock`;
    loseCount++;
    lose.innerHTML = loseCount;
    localStorage.setItem("loseCount", loseCount);
  } else if (randomNumber === 2) {
    result.innerHTML = `You win!`;
    choicePlayer.innerHTML = `Scissors`;
    choiceComputer.innerHTML = "Paper";
    winCount++;
    win.innerHTML = winCount;
    localStorage.setItem("winCount", winCount);
  } else {
    result.innerHTML = `It's a tie!`;
    choicePlayer.innerHTML = `Scissors`;
    choiceComputer.innerHTML = `Scissors`;
    tieCount++;
    tie.innerHTML = tieCount;
    localStorage.setItem("tieCount", tieCount);
  }
}

function resetAll() {
  result.innerHTML = "";
  choicePlayer.innerHTML = "x";
  choiceComputer.innerHTML = "x";
  tieCount = 0;
  loseCount = 0;
  winCount = 0;
  tie.innerHTML = 0;
  lose.innerHTML = 0;
  win.innerHTML = 0;
  localStorage.clear();
}

function randomNum() {
  let randomNum = Math.floor(Math.random() * 3);
  return randomNum;
}
