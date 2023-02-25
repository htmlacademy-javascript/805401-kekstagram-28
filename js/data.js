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

// Функция счетчик коментариев от 1 до 3

const generateCommentsCount = () => getRandomInteger(1, 3);

// Функция для создания случайного обьекта коментария для фотографии

const createRandomMessages = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${generateAvatarUrl()}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Временная заметка, тут нужна функция только так данные живые, еслb переменная то тащим одни и теже значения в обьект
const randomMessagesGallery = () => Array.from({ length: generateCommentsCount()}, createRandomMessages);

// Функция для создания случайного обьекта фотографии

const createPhotoPost = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: randomMessagesGallery(),
});

const randomPhotoGallery = () => Array.from({ length: GENERATION_COUNT }, createPhotoPost);

// eslint-disable-next-line no-console
console.log(randomPhotoGallery());

export { createPhotoPost, randomPhotoGallery };
