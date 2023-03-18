import { renderBigPicture } from './big-picture.js';

// находим поле для вставки миниатюр
const picturesСontainer = document.querySelector('.pictures');
// Находим шаблон изображения
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//функция создающая шаблон

const createThumbnail = (pictureData) => {
  // Клонируем шаблон
  const pictureElement = pictureTemplate.cloneNode(true);

  // Находим элемент изображения и записываем в переменную чтобы использовть его свойства
  const imageElement = pictureElement.querySelector('.picture__img');
  // Находим изображения
  imageElement.src = pictureData.url;
  // Находим подписи изображений
  imageElement.alt = pictureData.description;

  // Находим количество коментариев
  pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
  // Находим количество лайков
  pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;

  // Обработчик событий на отрисовку большого изображения
  pictureElement.addEventListener('click', () => {
    renderBigPicture(pictureData);
  });

  return pictureElement;
};

export { createThumbnail, picturesСontainer };

