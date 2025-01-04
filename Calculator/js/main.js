import { buttons } from './domElements.js';
import { handleNumber, handleOperator } from './calculator.js';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.textContent;

    if (!isNaN(action) || action === '.') {
      handleNumber(action);
    } else {
      switch (action) {
        case '+':
          handleOperator('add');
          break;
        case '-':
          handleOperator('subtract');
          break;
        case '*':
          handleOperator('multiply');
          break;
        case '/':
          handleOperator('divide');
          break;
        case 'C':
          handleOperator('clear');
          break;
        case 'DEL':
          handleOperator('delete');
          break;
        case '=':
          handleOperator('equals');
          break;
        default:
          break;
      }
    }
  });
});