// Define variables to keep track of game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Function to handle click events on the board
function handleCellClick(index) {
    if (gameBoard[index] === '' && !isGameOver()) {
        gameBoard[index] = currentPlayer;
        isGameOver(); 
        checkWinner(); 
        updateBoard();
        togglePlayer();
        
    }
}

// Function to update the visual representation of the board
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
    });
}

// Function to toggle between players (X and O)
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check if the game is over (either someone wins or it's a draw)
function isGameOver() {
    if (checkWinner()) {
        alert(getWinnerMessage());
        return true;
    } else if (gameBoard.every(cell => cell !== '')) {
        alert("It's a draw!");
        return true;
    }

    return false;
}

// Logic to check rows, columns, and diagonals for a winner
function checkWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            gameBoard[i * 3] === currentPlayer &&
            gameBoard[i * 3 + 1] === currentPlayer &&
            gameBoard[i * 3 + 2] === currentPlayer
        ) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            gameBoard[i] === currentPlayer &&
            gameBoard[i + 3] === currentPlayer &&
            gameBoard[i + 6] === currentPlayer
        ) {
            return true;
        }
    }

    // Check diagonals
    if (
        (gameBoard[0] === currentPlayer &&
            gameBoard[4] === currentPlayer &&
            gameBoard[8] === currentPlayer) ||
        (gameBoard[2] === currentPlayer &&
            gameBoard[4] === currentPlayer &&
            gameBoard[6] === currentPlayer)
    ) {
        return true;
    }

    return false;
}


// Function to get the winner message
function getWinnerMessage() {
    if (currentPlayer === 'X') {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

// Create the Tic Tac Toe cells dynamically
const boardElement = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleCellClick(i));
    boardElement.appendChild(cell);
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X'; // Player X starts the game (later player "O" will be AI)
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    updateBoard();
}

// Add event listener for the reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);