const VAL_EMPTY = 1;
const VAL_X = 2;
const VAL_O = 3;
const COLS = 20;
const ROWS = 20;
const CELL_SIZE = 40;

class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.value = VAL_EMPTY;
	}

	getHTML() {
		let top = this.x * CELL_SIZE;
		let left = this.y * CELL_SIZE;
		let cellHTML = `<div
      id="cell-${this.x}-${this.y}"
      onclick="play(${this.x},${this.y})"
      class="cell"
      style="
        position: absolute;
        width: ${CELL_SIZE}px;
        height: ${CELL_SIZE}px;
        left: ${left}px;
        top: ${top}px;
        line-height: ${CELL_SIZE}px;
      "
    ></div>`;

		return cellHTML;
	}

	draw() {
		let cellDiv = document.getElementById(`cell-${this.x}-${this.y}`);
		switch (this.value) {
			case VAL_X:
				cellDiv.innerHTML = "X";
				break;
			case VAL_O:
				cellDiv.innerHTML = "O";
				break;
			default:
				cellDiv.innerHTML = "";
				break;
		}
	}
}

class GameBoard {
	constructor(rows, cols, displayId) {
		this.rows = rows;
		this.cols = cols;
		this.elementId = displayId;
		this.turn = VAL_X;
		this.cells = [];
		this.isOver = false;
	}

	draw() {
		let gameBoardDiv = document.getElementById(this.elementId);
		gameBoardDiv.innerHTML = "";
		for (let i = 0; i < this.rows; i++) {
			let row = [];
			//   this.cells.push(row);
			for (let j = 0; j < this.cols; j++) {
				let cell = new Cell(i, j);
				row.push(cell);
				gameBoardDiv.innerHTML += cell.getHTML();
			}
			this.cells.push(row);
		}
	}

	play(x, y) {
		if (this.isOver) {
			return;
		}
		let cell = this.cells[x][y];
		if (cell.value === VAL_EMPTY) {
			cell.value = this.turn;
			cell.draw();
			this.check(x, y);
			if (this.turn === VAL_O) {
				this.turn = VAL_X;
			} else {
				this.turn = VAL_O;
			}
		} else {
			alert("Cell is not empty");
		}
	}

	check(x, y) {
		let cell = this.cells[x][y];
		//Horizontal
		let count = 1;
		let i = 1;
		while (y + i < this.cols && this.cells[x][y + i].value === cell.value) {
			count++;
			i++;
		}
		i = 1;
		while (y - i >= 0 && this.cells[x][y - i].value === cell.value) {
			count++;
			i++;
		}
		this.endGame(count);
		//Vertical
		count = 1;
		i = 1;
		while (x + i < this.rows && this.cells[x + i][y].value === cell.value) {
			count++;
			i++;
		}
		i = 1;
		while (x - i >= 0 && this.cells[x - i][y].value === cell.value) {
			count++;
			i++;
		}
		this.endGame(count);
		//Left diagonal
		count = 1;
		i = 1;
		let j = 1;
		while (
			y + i < this.cols &&
			x + i < this.rows &&
			this.cells[x + i][y + j].value === cell.value
		) {
			count++;
			i++;
			j++;
		}
		i = 1;
		j = 1;
		while (
			x - i >= 0 &&
			y - j >= 0 &&
			this.cells[x - i][y - j].value === cell.value
		) {
			count++;
			i++;
			j++;
		}
		this.endGame(count);
		//Right diagonal
		count = 1;
		i = 1;
		j = 1;
		while (
			y + j < this.cols &&
			x - i >= 0 &&
			this.cells[x - i][y + j].value === cell.value
		) {
			count++;
			i++;
			j++;
		}
		i = 1;
		j = 1;
		while (
			y - j >= 0 &&
			x + i < this.rows &&
			this.cells[x + i][y - j].value === cell.value
		) {
			count++;
			i++;
			j++;
		}
		this.endGame(count);
	}

	endGame(count) {
		if (count >= 5) {
			this.isOver = true;
			if (this.turn === VAL_X) alert("X Won!");
			else if (this.turn === VAL_O) alert("O Won!");
		}
	}
}

function play(x, y) {
	gameBoard.play(x, y);
}

function start() {
	gameBoard = new GameBoard(ROWS, COLS, "game-board");
	gameBoard.draw();
}

let gameBoard;
start();
