
import {
    lengthInput,
    uppercaseCheckbox,
    numbersCheckbox,
    symbolsCheckbox,
    generateButton,
    passwordInput,
    copyButton
  } from './domElements.js';
  import { generatePassword } from './passwordGenerator.js';
  
  generateButton.addEventListener('click', () => {
    const length = +lengthInput.value;
    const includeUppercase = uppercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;
  
    const password = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    passwordInput.value = password;
  });
  
  copyButton.addEventListener('click', () => {
    passwordInput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
  });