const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let moveHistory = [];
let currentMoveIndex = -1;

function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerText = board[row][col];
            cell.addEventListener('click', () => makeMove(row, col));
            boardElement.appendChild(cell);
        }
    }
    updateStatus();
}

function makeMove(row, col) {
    if (board[row][col] !== '' || checkWinner()) return;

    board[row][col] = currentPlayer;
    moveHistory = moveHistory.slice(0, currentMoveIndex + 1);
    moveHistory.push(JSON.parse(JSON.stringify(board)));
    currentMoveIndex++;
    
    if (checkWinner()) {
        updateStatus(`Player ${currentPlayer} wins!`);
        prevButton.disabled = false;
        nextButton.disabled = true;
    } else if (isBoardFull()) {
        updateStatus("It's a draw!");
        prevButton.disabled = false;
        nextButton.disabled = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    renderBoard();
    updateButtons();
}

function updateStatus(message = `Player ${currentPlayer}'s turn`) {
    statusElement.innerText = message;
}

function isBoardFull() {
    return board.flat().every(cell => cell !== '');
}

function checkWinner() {
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]], // rows
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]], // columns
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]], // diagonals
        [[0, 2], [1, 1], [2, 0]]
    ];

    return winningCombinations.some(combination => {
        const [[a, b], [c, d], [e, f]] = combination;
        return board[a][b] === currentPlayer && 
               board[c][d] === currentPlayer && 
               board[e][f] === currentPlayer;
    });
}

function updateButtons() {
    prevButton.disabled = currentMoveIndex <= 0;
    nextButton.disabled = currentMoveIndex >= moveHistory.length - 1;
}

function showMove(index) {
    currentMoveIndex = index;
    board = moveHistory[currentMoveIndex];
    renderBoard();
    updateButtons();
    updateStatus();
}

prevButton.addEventListener('click', () => showMove(currentMoveIndex - 1));
nextButton.addEventListener('click', () => showMove(currentMoveIndex + 1));

resetButton.addEventListener('click', () => {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    moveHistory = [];
    currentMoveIndex = -1;
    renderBoard();
    updateStatus();
    prevButton.disabled = true;
    nextButton.disabled = true;
});

renderBoard();
