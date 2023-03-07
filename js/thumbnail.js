import { getRandomPhotoGallery, } from './data.js';

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

const picture = document.querySelector('.pictures');
const pictureTitle = picture.querySelector('.pictures__title');

// Временно показываем блок изображений
pictureTitle.classList.remove('visually-hidden');

// Находим шаблон изображения
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureItom = getRandomPhotoGallery();

const pictureItomFragment = document.createDocumentFragment();

pictureItom.forEach(({ url, comments, likes }) => {
  // Клонируем шаблон
  const pictureElement = pictureTemplate.cloneNode(true);
  // Находим изображения
  pictureElement.querySelector('.picture__img').src = url;
  // Находим количество коментариев
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  // Находим количество лайков
  pictureElement.querySelector('.picture__likes').textContent = likes;

  // Отрисовываем шаблон в блок picture
  pictureItomFragment.append(pictureElement);
});

// Отрисуем сгенерированные DOM-элементы в блок .pictures
picture.append(pictureItomFragment);

