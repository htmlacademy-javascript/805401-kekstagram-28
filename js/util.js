// Функция для проверки длины строки true false

const counter = 10;
const string = '-7 Лёша на полке клопа нашёл 7-';
const checkLengthString = (str, count) => String(str).length <= count;

checkLengthString(string, counter);


// Функция для проверки, является ли строка палиндромом.

const checkStringPalindrome = (str) => {
  str = String(str).toLowerCase().replace(/\s/g, '');
  return str === str.split('').reverse().join('');
};

checkStringPalindrome(string);

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

// Не смог получить NaN в таком варианте решения возможно ли это??
// const extractNumber = (str) => typeof str === 'number' ? parseInt(str.toString().replace('.', ''), 10) : Number(str.replace(/[/\D/]/gi, ''));

const extractNumber = (str) => {
  if (typeof str === 'number') {
    return Math.abs(parseInt(str.toString().replace('.', ''), 10));
  }
  if (str.replace(/[/\D/]/gi, '') === 0) {
    return NaN;
  }
  return Number(str.replace(/[/\D/]/gi, ''));
};

extractNumber(string);

// Функция, которая принимает три параметра

// решение от Академии
const myPadStart = (str, minLength, pad) => {

  const actualPad = minLength - str.length;
  if (actualPad <= 0) {
    return str;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + str;
};

myPadStart('q', 4, 'werty');

// Мое решение
// const myPadStart = (str, minLength, pad) => str.padStart(minLength, pad);

export { checkLengthString, checkStringPalindrome, extractNumber, myPadStart };
