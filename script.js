// List of possible values for tiles (for simplicity, using numbers here)
const values = [1, 2, 3, 4, 5, 6, 7, 8];
let tiles = [...values, ...values]; // Double the array to get pairs

// Shuffle function to randomize the tiles
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(tiles);

const gameBoard = document.getElementById('game-board');

let firstTile = null;
let secondTile = null;
let isChecking = false;
let matchedPairs = 0;

// Initialize the game board
tiles.forEach((value, index) => {
    const tile = document.createElement('div');
    tile.classList.add('tile', 'hidden');
    tile.setAttribute('data-value', value);
    tile.setAttribute('data-index', index);
    tile.innerText = value; // Set tile value (hidden initially)
    tile.addEventListener('click', () => onTileClick(tile));
    gameBoard.appendChild(tile);
});

function onTileClick(tile) {
    if (isChecking || tile === firstTile || !tile.classList.contains('hidden')) return;

    tile.classList.remove('hidden');
    
    if (!firstTile) {
        firstTile = tile;
    } else {
        secondTile = tile;
        checkForMatch();
    }
}

function checkForMatch() {
    isChecking = true;
    
    if (firstTile.getAttribute('data-value') === secondTile.getAttribute('data-value')) {
        firstTile.classList.add('matched');
        secondTile.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === values.length) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }

        resetSelection();
    } else {
        setTimeout(() => {
            firstTile.classList.add('hidden');
            secondTile.classList.add('hidden');
            resetSelection();
        }, 500); // Give the player a second to see the tiles
    }
}

function resetSelection() {
    firstTile = null;
    secondTile = null;
    isChecking = false;
}
