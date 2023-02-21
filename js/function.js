
// // Функция для проверки длины строки true false
// const addString = '-7 Лёша на полке клопа нашёл 7-';
// // const addString = 440444444044;
// const counterString = 20;

// // const checkLengthString = (str, count) => {
// //   if (String(str).length <= count) {
// //     return true;
// //   }
// //   return false;
// // };

// const checkLengthString = (str, count) => String(str).length <= count;

// // const checkLengthString = (string, count) => String(string).length <= count ? true : false;

// console.log(checkLengthString(addString, counterString));


// // Функция для проверки, является ли строка палиндромом.

// // const checkStringPalindrome = (str) => String(str).split('').reverse().join('') === String(str);

// // const checkStringPalindrome = (str) => {
// //   if (String(str).toLowerCase().replace(/\s/g,'').split('').reverse().join('') === String(str).toLowerCase().replace(/\s/g,'')) {
// //     return true;
// //   }
// //   return false;
// // };

// // Решение от Академии с лайва
// // const checkStringPalindrome = (str) => {

// //   const tempString = str
// //     .toLowerCase()
// //     .replaceAll(' ', '');//Удаляет пробелы
// // Вынести в отдельную функцию переворот
// //   let reverseString = '';
// //   for (let i = tempString.length - 1; i >= 0; i--) {
// //     reverseString += tempString.at(i);
// //   }
// //   return tempString === reverseString;
// // };

// // Решение от Академии 2
// const checkStringPalindrome = (str) => {

//   const tempString = str
//     .toLowerCase()
//     .replaceAll(' ', ''); //Удаляет пробелы
//   // Вынести в отдельную функцию переворот
//   let reverseString = '';
//   for (let i = tempString.length - 1; i >= 0; i--) {
//     reverseString += tempString.at(i);
//   }
//   return tempString === reverseString;
// };


// // const checkStringPalindrome = (str) => {
// //   str = String(str).toLowerCase().replace(/\s/g, '');
// //   return str === str.split('').reverse().join('');
// // };


// // const checkStringPalindrome = (str) => {
// //   str = String(str).toLowerCase().replaceAll(' ','');
// //   return str === str.split('').reverse().join('');
// // };

// console.log(checkStringPalindrome(addString));

// // Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:
// // имя_функции('2023 год');            // Результат: число 2023
// // Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число:
// // имя_функции(2023); // Результат: число 2023

// // Решение от Академии с моими правками

// // const extractNumber = (string) => {
// //   if (typeof string === 'number') {
// //     return Math.abs(string);
// //   }
// //   let result = '';
// //   for (let i = 0; i < string.length; i++) {
// //     if (!Number.isNaN(parseInt(string.at(i), 10))) {
// //       result += string.at(i);
// //     }
// //   }
// //   return Math.abs(parseInt(result, 10)) ;
// // };
// //  console.log(extractNumber('Hello -2.3'));
// // Моё решение
// // const extractNumber = (string) => {
// //   if (typeof string === 'number') {
// //     return Math.abs(string);
// //   }
// //   if (Math.abs(string.replace(/[a-zа-яё]/gi, ' ')) === 0) {
// //     return NaN;
// //   }
// //   return Math.abs(string.replace(/[/\D/]/gi, ' '));
// // };


// // console.log(str.toString());
// // console.log(str.toString().replace('.', ''));
// // console.log(parseInt(str.toString().replace('.', ''), 10));

// // const extractNumber = (str) => typeof str === 'number' ? parseInt(str.toString().replace('.', ''), 10) : Number(str.replace(/[/\D/]/gi, ''));

// // console.log(str.toString()); // Переводим в строку
// // console.log(str.toString().replace('.', '')); // Убираем точку
// // console.log(parseInt(str.toString().replace('.', ''), 10)); // Снова перводим в число

// const extractNumber = (str) => {
//   if (typeof str === 'number') {
//     return Math.abs(parseInt(str.toString().replace('.', ''), 10));
//   }
//   if (str.replace(/[/\D/]/gi, '') === 0) {
//     return NaN;
//   }
//   return Number(str.replace(/[/\D/]/gi, ''));
// };

// console.log(extractNumber(-2.2));

// // Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
// // Эта функция нам пригодится для формирования адресов файлов. Примеры её использования:
// // // Добавочный символ использован один раз
// // имя_функции('1', 2, '0');      // Результат: строка '01'

// // решение от Академии
// // const myPadStart = (string, minLength, pad) => {

// //   const actualPad = minLength - string.length;
// //   if (actualPad <= 0) {
// //     return string;
// //   }
// //   return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
// // };

// const myPadStart = (string, minLength, pad) => string.padStart(minLength, pad);


// console.log(myPadStart('qwerty', 4, '0'));
