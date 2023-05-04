const board = document.getElementById('board');
const info = document.getElementById('info');
const restart = document.getElementById('restart');

let currentPlayer = 'X';
let gameEnd = false;
let moves = 0;

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

board.addEventListener('click', function(event) {
	if (gameEnd) {
		return;
	}

	const cell = event.target;
	const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);

	if (cell.textContent !== '') {
		return;
	}

	cell.textContent = currentPlayer;
	moves++;

	if (checkWin()) {
		info.textContent = currentPlayer + ' wins!';
		gameEnd = true;
	} else if (moves === 9) {
		info.textContent = 'Draw!';
		gameEnd = true;
	} else {
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		info.textContent = "It's " + currentPlayer + "'s turn";
	}
});

restart.addEventListener('click', function() {
	reset();
});

function checkWin() {
	return winningCombinations.some(combination => {
		return combination.every(index => {
			return board.children[index].textContent === currentPlayer;
		});
	});
}

function reset() {
	for (let i = 0; i < board.children.length; i++) {
		board.children[i].textContent = '';
	}

	currentPlayer = 'X';
	gameEnd = false;
	moves = 0;
	info.textContent = "It's " + currentPlayer + "'s turn";
}

reset();
