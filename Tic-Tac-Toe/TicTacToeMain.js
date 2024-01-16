// Selecting elements
const cells = document.querySelectorAll(".cell");
const playerTurn = document.querySelector(".status-text");
let player1ScoreEl = document.querySelector("#player-1-score");
let player2ScoreEl = document.querySelector("#player-2-score");
const resultEl = document.querySelector(".result");
const restartButton = document.querySelector(".restart");
const resetButton = document.querySelector(".reset-score");
const cell1 = document.querySelector(".cell1");
const cell2 = document.querySelector(".cell2");
const cell3 = document.querySelector(".cell3");
const cell4 = document.querySelector(".cell4");
const cell5 = document.querySelector(".cell5");
const cell6 = document.querySelector(".cell6");
const cell7 = document.querySelector(".cell7");
const cell8 = document.querySelector(".cell8");
const cell9 = document.querySelector(".cell9");

let currentPlayer = "X";
let isGameActive = true;

cellClickEvent(cell1);
cellClickEvent(cell2);
cellClickEvent(cell3);
cellClickEvent(cell4);
cellClickEvent(cell5);
cellClickEvent(cell6);
cellClickEvent(cell7);
cellClickEvent(cell8);
cellClickEvent(cell9);

// Reset score
resetButton.addEventListener("click", resetScore);
function resetScore() {
  player1ScoreEl.innerHTML = "0";
  player2ScoreEl.innerHTML = "0";
  restartGame();
}

// Function to display a player's turn
function cellClickEvent(cellNumber) {
  cellNumber.addEventListener("click", () => {
    if (cellNumber.textContent === "" && isGameActive) {
      cellNumber.textContent = currentPlayer;
      winMessage();
      checkCurrentPlayer();
    }
  });
}

//Function to update score
function updateScore(currentPlayer) {
  if (currentPlayer === "X") {
    player1ScoreEl.textContent = parseInt(player1ScoreEl.textContent) + 1;
  } else if (currentPlayer === "O") {
    player2ScoreEl.textContent = parseInt(player2ScoreEl.textContent) + 1;
  }
}

// Function to check player's turn
function checkCurrentPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else if (currentPlayer === "O") {
    currentPlayer = "X";
  }
  playerTurn.textContent = `${currentPlayer}'s turn`;
}

// Check for result
function winMessage() {
  const winConditions = [
    [cell1, cell2, cell3],
    [cell4, cell5, cell6],
    [cell7, cell8, cell9],
    [cell1, cell4, cell7],
    [cell2, cell5, cell8],
    [cell3, cell6, cell9],
    [cell1, cell5, cell9],
    [cell3, cell5, cell7]
  ];

  let isWin = false;

  winConditions.forEach((condition) => {
    if (
      condition[0].textContent === condition[1].textContent &&
      condition[1].textContent === condition[2].textContent &&
      condition[0].textContent !== ""
    ) {
      isGameActive = false;
      resultEl.textContent = `${currentPlayer} has won!`;
      resultEl.classList.add("active");
      updateScore(currentPlayer);
      isWin = true;
    }
  });

  // Check for a tie if no win condition is met
  if (
    !isWin &&
    [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9].every(
      (cell) => cell.textContent !== ""
    )
  ) {
    isGameActive = false;
    resultEl.textContent = "It's a tie!";
    playerTurn.textContent = "It's a tie!";
    resultEl.classList.add("active");
  }
}

// Restart Game
restartButton.addEventListener("click", restartGame);
function restartGame() {
  currentPlayer = "X";
  isGameActive = true;
  playerTurn.textContent = `${currentPlayer}'s turn`;
  resultEl.classList.remove("active");
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}
