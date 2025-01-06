import { initializeGame } from './gameLogic.js';
import { memoryGame } from './domElements.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeGame();
});

document.getElementById('refresh').addEventListener('click', () => {
  initializeGame();
});