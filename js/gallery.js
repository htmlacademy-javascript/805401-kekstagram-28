// Импорты модулей

import { renderElements } from './util.js';
import { renderBigPicture, onOpenBigPictureClick } from './big-picture.js';
import { createThumbnail } from './thumbnail.js';

// Контейнер изображения
const picturesConteiner = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  // Обработчик событий для открытия большого изображения
  picturesConteiner.addEventListener('click', (evt) => {
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
  });

  renderElements(pictures, createThumbnail, picturesConteiner);
};

// Экспорты функций

export { renderGallery };
