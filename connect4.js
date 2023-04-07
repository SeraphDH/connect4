const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

// Initialize the game
function resetGame() {
  makeBoard();
  makeHtmlBoard();
  currPlayer = 1;
}

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board[y] = Array.from({ length: WIDTH }).fill(null); // fill the row with null values
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');
  htmlBoard.innerHTML = ''; // reset the HTML board

  // make column tops clickable for player to choose a column
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    headCell.textContent = x + 1; // Add text content to the cell
    top.append(headCell);
  }

  htmlBoard.append(top);

  // make the main part of the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    htmlBoard.append(row);
  }
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    setTimeout(function() {
      alert(`Player ${currPlayer} wins!`);
      resetGame();
    }, 100);
    return;
  }

  // check for tie
  if (board.every(row => row.every(cell => cell !== null))) { // check if all cells are not null
    setTimeout(function() {
      alert('Tie!');
      resetGame();
    }, 100);
    return;
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === null) { // check if cell is null
      return y;
    }
  }
  return null;
}

/** placeInTable
: function to update the HTML table with the current player's piece at the specified position (y, x).
*/
function placeInTable(y, x) {
    const cell = document.getElementById(`${y}-${x}`); // Fix: added backticks for string
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add('player' + currPlayer);
    cell.appendChild(piece);
    }
    
    /** checkForWin: check board cell-by-cell for "does a win start here?" */
    function checkForWin() {
    function _win(cells) {
    // Check if cells are all the same player's piece
    return cells.every(
    ([y, x]) =>
    y >= 0 &&
    y < HEIGHT &&
    x >= 0 &&
    x < WIDTH &&
    board[y][x] === currPlayer
    );
    }
    
    // Check horizontally
    for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH - 3; x++) {
    if (_win([[y, x], [y, x + 1], [y, x + 2], [y, x + 3]])) {
    return true;
    }
    }
    }
    
    // Check vertically
    for (let y = 0; y < HEIGHT - 3; y++) {
    for (let x = 0; x < WIDTH; x++) {
    if (_win([[y, x], [y + 1, x], [y + 2, x], [y + 3, x]])) {
    return true;
    }
    }
    }
    
    // Check diagonally (top left to bottom right)
    for (let y = 0; y < HEIGHT - 3; y++) {
    for (let x = 0; x < WIDTH - 3; x++) {
    if (_win([[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]])) {
    return true;
    }
    }
    }
    
    // Check diagonally (top right to bottom left)
    for (let y = 0; y < HEIGHT - 3; y++) {
    for (let x = 3; x < WIDTH; x++) {
    if (_win([[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]])) {
    return true;
    }
    }
    }
    
    return false;
    }
    
    // Call resetGame() to initialize the game when the page loads
    resetGame();
  

  
  