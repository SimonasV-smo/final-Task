export function getBestScore() {
    return parseInt(localStorage.getItem('bestScore')) || 0;
  }
  
  export function setBestScore(score) {
    localStorage.setItem('bestScore', score);
  }
  
  export function getGameState() {
    return JSON.parse(localStorage.getItem('gameState')) || null;
  }
  
  export function setGameState(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
  }