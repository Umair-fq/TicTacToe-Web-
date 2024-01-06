// message div, if cell is already selected
const message = document.getElementById('message');
const playerX = 'X';
const playerO = 'O';
let isPlayerX = true;
let isGameOver = false; // New flag to track game state

//creating board
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// winning combinations in 2D array
const winningCombinations = [
    // row combinations
    [[0, 0], [0, 1], [0, 2]], // first row
    [[1, 0], [1, 1], [1, 2]], // second row
    [[2, 0], [2, 1], [2, 2]], // third row

    // col combinations
    [[0, 0], [1, 0], [2, 0]], // first col
    [[0, 1], [1, 1], [2, 1]], // second col
    [[0, 2], [1, 2], [2, 2]], // third col

    // diagonal combinations
    [[0, 0], [1, 1], [2, 2]], // top-left to bottom-right
    [[0, 2], [1, 1], [2, 0]]  // top-right to bottom-left
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            board[a[0]][a[1]] !== '' &&
            board[a[0]][a[1]] === board[b[0]][b[1]] &&
            board[a[0]][a[1]] === board[c[0]][c[1]]
        ) {
            isGameOver = true; // Set game state to over when a player wins
            return { result: 'winner', player: board[a[0]][a[1]] };
        }
    }

    // Check for a draw
    if (board.flat().every(cell => cell !== '')) {
        isGameOver = true; // Set game state to over when it's a draw
        return { result: 'draw' };
    }
    // No winner or draw
    return { result: 'continue' };
}

const renderBoard = () => {
    // getting empty board div from html
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            //creating 9 cells in the board div according to the board 2d array
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.textContent = board[i][j];
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
};

function handleCellClick(event) {
    if (isGameOver) return; // If the game is over, do not allow further moves

    // getting which cell is clicked
    const cellClicked = event.target;
    const row = parseInt(cellClicked.dataset.row);
    const col = parseInt(cellClicked.dataset.col);

    // if that cell is empty.
    if (board[row][col] === '') {
        if (isPlayerX) {
            board[row][col] = playerX;
        } else {
            board[row][col] = playerO;
        }
        // switching the turn
        isPlayerX = !isPlayerX;
        message.innerHTML = '';
    } else {
        XPathExpression// if the cell already contains the move
        message.innerHTML = 'Select other cell';
    }

    const result = checkWinner();
    if (result.result === 'winner') {
        message.innerHTML = `Winner ${result.player}`;
    } else if (result.result === 'draw') {
        message.innerHTML = 'Game drawn!';
    } else {
        message.innerHTML = '';
    }
    renderBoard();
}

renderBoard();
