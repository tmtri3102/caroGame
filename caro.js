let board = document.getElementById("board");
let row = "";
let turn = false;
let arr = [];
for (let i = 0; i < 20; i++) {
	arr.push([i]);
	row = "<tr>";
	for (let j = 0; j < 20; j++) {
		row += `
     <td>
      <div id="turn" class="turn" onclick="changeTurn(this)"></div>
     </td>
    `;
		arr[i].push(arr[i][j]);
	}
	row += "</tr>";
	board.innerHTML += row;
}

function changeTurn(element) {
	if (turn) {
		element.innerHTML = "X";
	} else {
		element.innerHTML = "O";
	}
	element.style.border = "0px";

	turn = !turn;
}

//  <input type="checkbox" onclick="changeTurn()" id="turn"/>
// <div id="checkbox" class="checkbox"></div>
// document.getElementById("turn").innerHTML = "x"

function checkWinner() {}
