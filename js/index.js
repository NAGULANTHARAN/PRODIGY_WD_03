const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');
const player1ScoreElem = document.getElementById('player1Score');
const player2ScoreElem = document.getElementById('player2Score');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const singlePlayerBtn = document.getElementById('singlePlayerBtn');
const multiPlayerBtn = document.getElementById('multiPlayerBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let isGameActive = false;
let gameMode = '';
let player1Score = 0;
let player2Score = 0;
let winner = null;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


singlePlayerBtn.addEventListener('click', startSinglePlayer);
multiPlayerBtn.addEventListener('click', startMultiplayer);
restartBtn.addEventListener('click', restartGame);
toggleThemeBtn.addEventListener('click', toggleTheme);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function startSinglePlayer() {
  resetGame();
  gameMode = 'single';
  isGameActive = true;
  statusText.textContent = "Player X's Turn";
}

function startMultiplayer() {
  resetGame();
  gameMode = 'multi';
  isGameActive = true;
  statusText.textContent = "Player X's Turn";
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  
  if (board[index] !== "" || !isGameActive) {
    return;
  }

  updateCell(e.target, index);
  checkWinner();
  
  if (gameMode === 'single' && currentPlayer === 'O' && isGameActive) {
    aiMove();
  }
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    updateScore();
    isGameActive = false;
    restartBtn.classList.remove('hidden');
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
    restartBtn.classList.remove('hidden');
    return;
  }

  switchPlayer();
}

function updateScore() {
  if (currentPlayer === 'X') {
    player1Score++;
    player1ScoreElem.textContent = player1Score;
  } else {
    player2Score++;
    player2ScoreElem.textContent = player2Score;
  }
}

function aiMove() {
  const emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  
  const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
  updateCell(cell, randomIndex);
  checkWinner();
}

function restartGame() {
  resetGame();
  if (gameMode) {
    isGameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = 'X';
  isGameActive = false;
  restartBtn.classList.add('hidden');
  statusText.textContent = "Choose mode to start the game";
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}
