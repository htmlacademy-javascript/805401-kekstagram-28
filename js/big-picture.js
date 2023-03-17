import { isEscapeKeydown, renderElements } from './util.js';

const body = document.querySelector('body');
// находим контейнер с миниатюрами
const thumbnaiPicture = document.querySelector('.pictures');
// Контейнер большого изображения
const bigPicture = document.querySelector('.big-picture');
// Кнопка закрыть
const btnCloseBigPicture = bigPicture.querySelector('.big-picture__cancel');
// Большое фото
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
// Подпись для фотографии
const socialCaption = bigPicture.querySelector('.social__caption');
// Счетчик лайков
const likesCount = bigPicture.querySelector('.likes-count');
// Блок счетчика комментариев (${число} из)
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
// Счетчик комиентариев (из ${число})
const commentsCount = bigPicture.querySelector('.comments-count');
// Блок-список комментариев
const socialComments = bigPicture.querySelector('.social__comments');
// Элемент список коментариев
const socialComment = socialComments.querySelector('.social__comment');
// Кнопка загрузить еще коментарии
const btnCommentsLoader = bigPicture.querySelector('.comments-loader');

//функция создающая шаблон

const createComment = (comment) => {

  // Клонируем шаблон
  const commentElement = socialComment.cloneNode(true);
  // Находим коментарий аватар
  commentElement.querySelector('.social__picture').src = comment.avatar;
  // Находим имя
  commentElement.querySelector('.social__picture').alt = comment.name;
  // Находим текст комментария
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

// Функция отрисовки большого изображения

const renderBigPicture = (picture) => {
  socialComments.innerHTML = '';
  socialCommentCount.classList.add('hidden');
  btnCommentsLoader.classList.add('hidden');
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;
  commentsCount.textContent = picture.comments.length;
  renderElements(picture.comments, createComment, socialComments);
};

// Функция удаления обработчиков событий

const onRemoveClickAndKeydownBigPicture = () => {
  document.removeEventListener('keydown', onCloseBigPictureKeydown);
  btnCloseBigPicture.removeEventListener('click', onCloseBigPictureClick);
  // Вызовы обработчикa событий открытия окна
  thumbnaiPicture.addEventListener('click', onOpenBigPictureClick);
};

// Функция открывающая большое изображение

function onOpenBigPictureClick(evt) {
  evt.preventDefault();
  // Делигирование событий
  if (evt.target.closest('.picture')) {

    // Показываем большое изображение
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    // Вызов обработчика событий закрытия окна клавишей Esc
    document.addEventListener('keydown', onCloseBigPictureKeydown);
    // Вызов обработчика событий закрытия окна нажатием кнопки закрыть
    btnCloseBigPicture.addEventListener('click', onCloseBigPictureClick);
    // Удаление обработчикa событий открытия окна
    thumbnaiPicture.removeEventListener('click', onOpenBigPictureClick);
  }
}

// Функция скрывает большое изображение по клику

function onCloseBigPictureClick() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  // Вызываем функцию удвления обработчиков
  onRemoveClickAndKeydownBigPicture();
}

// Функция скрывает большое изображение по нажатию клавиши

function onCloseBigPictureKeydown(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    // Вызываем функцию удвления обработчиков
    onRemoveClickAndKeydownBigPicture();
  }
}

// Вызовы обработчикa событий открытия окна
thumbnaiPicture.addEventListener('click', onOpenBigPictureClick);

// Экспорты функций

export { renderBigPicture };
