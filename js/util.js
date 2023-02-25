// Функция поиска случайного числа

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция-генератор для получения уникальных идентификаторов из указанного диапазона

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Функция-генератор для получения уникального ID

function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

//Функция поиска случайного элемента в массиве

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Экспорты функций

export { getRandomInteger, createRandomIdFromRangeGenerator, createIdGenerator, getRandomArrayElement };
