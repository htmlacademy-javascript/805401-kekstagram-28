// Импорты модулей

import { renderElements } from './util.js';
import { renderBigPicture, onOpenBigPictureClick } from './big-picture.js';
import { createThumbnail } from './thumbnail.js';

// Контейнер изображения
const picturesConteiner = document.querySelector('.pictures');

// Назначаем пустой массив
let pictures = [];

// Функция для клика по контейнеру
const onContainerClick = (evt) => {
  // Используем делегирование для открытия большого изображения
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  // Ищем элемент по id
  const picture = pictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId
  );
  evt.preventDefault();
  // Отрисовываем большое изображение
  renderBigPicture(picture);
  // Вызовы обработчикa событий открытия окна
  onOpenBigPictureClick();
};

// Функция отрисовывает галерею

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  // Отрисовываем элементы
  renderElements(pictures, createThumbnail, picturesConteiner);
  // Обработчик событий на клик по контейнеру для открытия большого изображения
  picturesConteiner.addEventListener('click', onContainerClick);
};

// Экспорты функций

export { renderGallery };
