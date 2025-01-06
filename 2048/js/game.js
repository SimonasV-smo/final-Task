import { grid, scoreElement, bestScoreElement, refreshButton } from './domElements.js';
import { getBestScore, setBestScore, getGameState, setGameState } from './storage.js';

const size = 4;
let score = 0;
let bestScore = getBestScore();
let tiles = [];

export function initializeGame() {
  score = 0;
  tiles = Array(size).fill().map(() => Array(size).fill(null));
  addRandomTile();
  addRandomTile();
  render();
  refreshButton.style.display = 'none';
}

function addRandomTile() {
  const emptyTiles = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!tiles[row][col]) {
        emptyTiles.push({ row, col });
      }
    }
  }
  if (emptyTiles.length > 0) {
    const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    tiles[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
}

function render() {
  grid.innerHTML = '';
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const tileValue = tiles[row][col];
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (tileValue) {
        tile.classList.add(`tile-${tileValue}`);
        tile.textContent = tileValue;
      }
      grid.appendChild(tile);
    }
  }
  scoreElement.textContent = score;
  bestScoreElement.textContent = bestScore;
}

function move(direction) {
  let moved = false;
  switch (direction) {
    case 'up':
      moved = moveUp();
      break;
    case 'down':
      moved = moveDown();
      break;
    case 'left':
      moved = moveLeft();
      break;
    case 'right':
      moved = moveRight();
      break;
  }
  if (moved) {
    addRandomTile();
    render();
    if (isGameOver()) {
      alert('Game Over!');
      refreshButton.style.display = 'block';
    }
    updateBestScore();
  }
}

function moveUp() {
  let moved = false;
  for (let col = 0; col < size; col++) {
    let merged = false;
    for (let row = 1; row < size; row++) {
      if (tiles[row][col]) {
        let newRow = row;
        while (newRow > 0 && !tiles[newRow - 1][col]) {
          newRow--;
        }
        if (newRow > 0 && tiles[newRow - 1][col] === tiles[row][col] && !merged) {
          tiles[newRow - 1][col] *= 2;
          score += tiles[newRow - 1][col];
          tiles[row][col] = null;
          merged = true;
          moved = true;
        } else if (newRow !== row) {
          tiles[newRow][col] = tiles[row][col];
          tiles[row][col] = null;
          moved = true;
        }
      }
    }
  }
  return moved;
}

function moveDown() {
  let moved = false;
  for (let col = 0; col < size; col++) {
    let merged = false;
    for (let row = size - 2; row >= 0; row--) {
      if (tiles[row][col]) {
        let newRow = row;
        while (newRow < size - 1 && !tiles[newRow + 1][col]) {
          newRow++;
        }
        if (newRow < size - 1 && tiles[newRow + 1][col] === tiles[row][col] && !merged) {
          tiles[newRow + 1][col] *= 2;
          score += tiles[newRow + 1][col];
          tiles[row][col] = null;
          merged = true;
          moved = true;
        } else if (newRow !== row) {
          tiles[newRow][col] = tiles[row][col];
          tiles[row][col] = null;
          moved = true;
        }
      }
    }
  }
  return moved;
}

function moveLeft() {
  let moved = false;
  for (let row = 0; row < size; row++) {
    let merged = false;
    for (let col = 1; col < size; col++) {
      if (tiles[row][col]) {
        let newCol = col;
        while (newCol > 0 && !tiles[row][newCol - 1]) {
          newCol--;
        }
        if (newCol > 0 && tiles[row][newCol - 1] === tiles[row][col] && !merged) {
          tiles[row][newCol - 1] *= 2;
          score += tiles[row][newCol - 1];
          tiles[row][col] = null;
          merged = true;
          moved = true;
        } else if (newCol !== col) {
          tiles[row][newCol] = tiles[row][col];
          tiles[row][col] = null;
          moved = true;
        }
      }
    }
  }
  return moved;
}

function moveRight() {
  let moved = false;
  for (let row = 0; row < size; row++) {
    let merged = false;
    for (let col = size - 2; col >= 0; col--) {
      if (tiles[row][col]) {
        let newCol = col;
        while (newCol < size - 1 && !tiles[row][newCol + 1]) {
          newCol++;
        }
        if (newCol < size - 1 && tiles[row][newCol + 1] === tiles[row][col] && !merged) {
          tiles[row][newCol + 1] *= 2;
          score += tiles[row][newCol + 1];
          tiles[row][col] = null;
          merged = true;
          moved = true;
        } else if (newCol !== col) {
          tiles[row][newCol] = tiles[row][col];
          tiles[row][col] = null;
          moved = true;
        }
      }
    }
  }
  return moved;
}

function isGameOver() {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!tiles[row][col]) {
        return false;
      }
      if (row > 0 && tiles[row][col] === tiles[row - 1][col]) {
        return false;
      }
      if (row < size - 1 && tiles[row][col] === tiles[row + 1][col]) {
        return false;
      }
      if (col > 0 && tiles[row][col] === tiles[row][col - 1]) {
        return false;
      }
      if (col < size - 1 && tiles[row][col] === tiles[row][col + 1]) {
        return false;
      }
    }
  }
  return true;
}

function updateBestScore() {
  if (score > bestScore) {
    bestScore = score;
    setBestScore(bestScore);
  }
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      move('up');
      break;
    case 'ArrowDown':
      move('down');
      break;
    case 'ArrowLeft':
      move('left');
      break;
    case 'ArrowRight':
      move('right');
      break;
  }
});

refreshButton.addEventListener('click', () => {
  initializeGame();
});