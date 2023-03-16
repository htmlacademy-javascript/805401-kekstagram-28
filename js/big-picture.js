// import { isEscapeKeydown } from './util.js';

// const thumbnaiPicture = document.querySelector('.pictures');
// const bigPicture = document.querySelector('.big-picture');
// const buttonClose = bigPicture.querySelector('.big-picture__cancel');

// // const thumbnail = thumbnaiPicture.querySelectorAll('.picture');
// // console.log(thumbnail);

// // Функция показывает большое изображение по клику

// const onOpenBigPictureClick = (evt) => {
//   evt.preventDefault();
//   // Делигирование событий
//   if (evt.target.closest('.picture')) {
//     // Действия
//     console.log(evt.target); // в консоль выводится элемент
//     // Показываем большое изображение
//     bigPicture.classList.remove('hidden');

//     bigPicture.querySelector('.big-picture__img').querySelector('img').src = evt.target.src;
//     bigPicture.querySelector('.big-picture__img').querySelector('img').alt = evt.target.alt;
//   }
// };

// // Функция скрывает большое изображение по клику

// const onCloseBigPictureClick = () => {
//   bigPicture.classList.add('hidden');
// };

// // Функция скрывает большое изображение по нажатию клавиши

// const onCloseBigPictureKeydown = (evt) => {
//   if (isEscapeKeydown(evt)) {
//     evt.preventDefault();
//     bigPicture.classList.add('hidden');
//   }
// };


// thumbnaiPicture.addEventListener('click', onOpenBigPictureClick);
// buttonClose.addEventListener('click', onCloseBigPictureClick);
// document.addEventListener('keydown', onCloseBigPictureKeydown);
