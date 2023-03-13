import { isEscapeKeydown } from './util.js';
import { renderThumbnails } from './thumbnail.js';

renderThumbnails();

const thumbnaiPicture = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');


// Функция показывает большое изображение по клику
const onOpenBigPictureClick = (evt) => {

  // Делигирование событий
  if (evt.target.nodeName === 'IMG') {
    // Действия
    bigPicture.classList.remove('hidden');
  }


};

// Функция скрывает большое изображение по клику
const onCloseBigPictureClick = () => {
  bigPicture.classList.add('hidden');
};

// Функция скрывает большое изображение по нажатию клавиши
const onCloseBigPictureKeydown = (evt) => {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};


thumbnaiPicture.addEventListener('click', onOpenBigPictureClick);

buttonClose.addEventListener('click', onCloseBigPictureClick);

document.addEventListener('keydown', onCloseBigPictureKeydown);
