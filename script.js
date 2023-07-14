// Game variables
let currentPlayer = 1;
let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;
let gameActive = true;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cells = document.getElementsByClassName('cell');
const status = document.getElementById('status');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');

// Function to handle cell click event
function makeMove(cellIndex) {
  if (!gameActive || cells[cellIndex].innerHTML !== '') {
    return;
  }

  const currentPlayerName = currentPlayer === 1 ? player1Name : player2Name;
  cells[cellIndex].innerHTML = currentPlayer === 1 ? 'X' : 'O';
  cells[cellIndex].classList.add(`player${currentPlayer}`);

  if (checkWin()) {
    const [a, b, c] = getWinningCombination();
    status.innerHTML = `${currentPlayerName} wins!`;
    updateScore(currentPlayer);
    gameActive = false;
    animateWinningMarkers([a, b, c]);
  } else if (checkDraw()) {
    status.innerHTML = 'It\'s a draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    status.innerHTML = `Current Turn: ${currentPlayer === 1 ? player1Name : player2Name}`;
  }
}

// Function to check for a win
function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (cells[a].innerHTML !== '' && cells[a].innerHTML === cells[b].innerHTML && cells[b].innerHTML === cells[c].innerHTML) {
      return true;
    }
  }
  return false;
}

// Function to get the winning combination
function getWinningCombination() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (cells[a].innerHTML !== '' && cells[a].innerHTML === cells[b].innerHTML && cells[b].innerHTML === cells[c].innerHTML) {
      return [a, b, c];
    }
  }
  return [];
}

// Function to check for a draw
function checkDraw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === '') {
      return false;
    }
  }
  return true;
}

// Function to update the score
function updateScore(player) {
  if (player === 1) {
    player1Score++;
    player1ScoreDisplay.innerHTML = `Player 1 Score: ${player1Score}`;
  } else {
    player2Score++;
    player2ScoreDisplay.innerHTML = `Player 2 Score: ${player2Score}`;
  }
}



// Function to reset the game
function resetGame() {
  currentPlayer = 1;
  player1Score = 0;
  player2Score = 0;
  gameActive = true;

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].classList.remove('player1', 'player2', 'winning-marker');
  }

  status.innerHTML = 'Current Turn: ' + player1Name;
  player1ScoreDisplay.innerHTML = 'Player 1 Score: 0';
  player2ScoreDisplay.innerHTML = 'Player 2 Score: 0';
  player1Name = document.getElementById('player1').value || 'Player 1';
  player2Name = document.getElementById('player2').value || 'Player 2';
}

// Initial game setup
resetGame();