import { display } from './domElements.js';
import { add, subtract, multiply, divide } from './mathOperators.js';

let currentInput = '0';
let firstOperand = null;
let operator = null;

export function handleNumber(number) {
  if (currentInput === '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

export function handleOperator(action) {
  switch (action) {
    case 'clear':
      currentInput = '0';
      operator = null;
      firstOperand = null;
      break;
    case 'delete':
      currentInput = currentInput.slice(0, -1) || '0';
      break;
    case 'decimal':
      if (!currentInput.includes('.')) {
        currentInput += '.';
      }
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        operator = action;
        currentInput = '0';
      } else if (operator) {
        const result = calculate(firstOperand, parseFloat(currentInput), operator);
        firstOperand = result;
        operator = action;
        currentInput = '0';
      }
      break;
    case 'equals':
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, parseFloat(currentInput), operator);
        currentInput = result.toString();
        operator = null;
        firstOperand = null;
      }
      break;
  }
  updateDisplay();
}

function calculate(first, second, operator) {
  switch (operator) {
    case 'add':
      return add(first, second);
    case 'subtract':
      return subtract(first, second);
    case 'multiply':
      return multiply(first, second);
    case 'divide':
      return divide(first, second);
    default:
      return second;
  }
}

function updateDisplay() {
  display.textContent = currentInput;
}