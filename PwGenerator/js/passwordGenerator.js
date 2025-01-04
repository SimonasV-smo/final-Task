import { getRandomLower, getRandomUpper, getRandomNumber, getRandomSymbol } from './utils.js';

export function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
  let generatedPassword = '';
  const typesCount = includeUppercase + includeNumbers + includeSymbols + 1; // +1 for lowercase
  const typesArr = [
    { includeLowercase: true },
    { includeUppercase },
    { includeNumbers },
    { includeSymbols }
  ].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

const randomFunc = {
  includeLowercase: getRandomLower,
  includeUppercase: getRandomUpper,
  includeNumbers: getRandomNumber,
  includeSymbols: getRandomSymbol
};