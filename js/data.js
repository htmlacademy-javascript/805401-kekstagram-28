import { getRandomInteger, createRandomIdFromRangeGenerator, createIdGenerator, getRandomArrayElement } from './util.js';

// Массивы данных для генерации обьектов

const NAMES = [
  'Мария',
  'Лука',
  'Ариана',
  'Ясмина',
  'Макар',
  'Екатерина',
  'Иван',
  'Павел',
  'Дмитрий',
  'Кирилл',
  'Артём',
  'Алексей',
  'София',
  'Даниил',
  'Вероника',
  'Анжелика',
  'Ксения',
  'Александр',
  'Матвей',
  'Владимир',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Высокие горы',
  'Сегодня солнечно',
  'Сегодня пасмурно',
  'Падает снег',
  'Мягкое солнце',
  'Пляж Лазурного берега',
  'Дорога жизни',
  'Тропа идущая вверх',
  'Солнечная поляна',
  'Сильный шторм',
  'Штиль на море',
  'Морской бриз',
  'Парусная яхта',
];

// Счетчик сгенерированных обьектов

const GENERATION_COUNT = 25;

// Переменная для генерации ID коментария
const generateCommentId = createRandomIdFromRangeGenerator(1, 200);
// Переменная для генерации ID автора
const generatePhotoId = createIdGenerator();
// Переменная для генерации URL: фотографии
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, GENERATION_COUNT);
// Переменная для генерации URL: фотографии аватара
const generateAvatarUrl = createRandomIdFromRangeGenerator(1, 6);

// Функция для создания случайного обьекта коментария для фотографии

const createRandomMessages = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${generateAvatarUrl()}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const randomMessageGallery = Array.from({ length: 3 }, createRandomMessages);

// Функция для создания случайного обьекта фотографии

const createPhotoPost = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: randomMessageGallery,
});

const randomPhotoGallery = Array.from({ length: GENERATION_COUNT }, createPhotoPost);

// eslint-disable-next-line no-console
console.log(randomPhotoGallery);

export { createPhotoPost, randomPhotoGallery };
