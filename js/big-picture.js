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

// Функция открывающая большое изображение

const onOpenBigPictureClick = (evt) => {
  evt.preventDefault();
  // Делигирование событий
  if (evt.target.closest('.picture')) {
    // Действия
    // console.log(evt.target); // в консоль выводится элемент
    // Показываем большое изображение
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  }
};

// Функция отрисовки большого изображения

const renderBigPictureAndOpenFullScreen = (picture) => {
  socialComments.innerHTML = '';
  socialCommentCount.classList.add('hidden');
  btnCommentsLoader.classList.add('hidden');
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;
  commentsCount.textContent = picture.comments.length;
  renderElements(picture.comments, createComment, socialComments);
};

// Функция скрывает большое изображение по клику

const onCloseBigPictureClick = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

// Функция скрывает большое изображение по нажатию клавиши

const onCloseBigPictureKeydown = (evt) => {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

// Вызовы обработчиков событий

thumbnaiPicture.addEventListener('click', onOpenBigPictureClick);
btnCloseBigPicture.addEventListener('click', onCloseBigPictureClick);
document.addEventListener('keydown', onCloseBigPictureKeydown);

// Экспорты функций

export { renderBigPictureAndOpenFullScreen };
