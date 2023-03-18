import { isEscapeKeydown, renderElements } from './util.js';

const elements = {
  body: document.querySelector('body'),
  // находим контейнер с миниатюрами
  thumbnaiPicture: document.querySelector('.pictures'),
  // Контейнер большого изображения
  bigPicture: document.querySelector('.big-picture'),
  // Кнопка закрыть
  btnCloseBigPicture: document.querySelector('.big-picture__cancel'),
  // Большое фото
  bigPictureImg: document.querySelector('.big-picture__img').querySelector('img'),
  // Подпись для фотографии
  socialCaption: document.querySelector('.social__caption'),
  // Счетчик лайков
  likesCount: document.querySelector('.likes-count'),
  // Блок счетчика комментариев (${число} из)
  socialCommentCount: document.querySelector('.social__comment-count'),
  // Счетчик комиентариев (из ${число})
  commentsCount: document.querySelector('.comments-count'),
  // Блок-список комментариев
  socialComments: document.querySelector('.social__comments'),
  // Элемент список коментариев
  socialComment: document.querySelector('.social__comment'),
  // Кнопка загрузить еще коментарии
  btnCommentsLoader: document.querySelector('.comments-loader'),
};

//функция создающая шаблон

const createComment = ({ avatar, name, message }) => {

  // Клонируем шаблон
  const commentElement = elements.socialComment.cloneNode(true);
  // Находим коментарий аватар
  commentElement.querySelector('.social__picture').src = avatar;
  // Находим имя
  commentElement.querySelector('.social__picture').alt = name;
  // Находим текст комментария
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

// Функция отрисовки большого изображения

const renderBigPicture = ({
  url,
  likes,
  description,
  comments
}) => {
  elements.socialComments.innerHTML = '';
  elements.socialCommentCount.classList.add('hidden');
  elements.btnCommentsLoader.classList.add('hidden');

  elements.bigPictureImg.src = url;
  elements.likesCount.textContent = likes;
  elements.socialCaption.textContent = description;
  elements.commentsCount.textContent = comments.length;

  renderElements(comments, createComment, elements.socialComments);
};

// Функция удаления обработчиков событий
// Исправить имя
const removeClickAndKeydownBigPicture = () => {
  document.removeEventListener('keydown', onCloseBigPictureKeydown);
  elements.btnCloseBigPicture.removeEventListener('click', onCloseBigPictureClick);
};

// Функция открывающая большое изображение

const onOpenBigPictureClick = (evt) => {
  evt.preventDefault();
  // Делигирование событий
  if (evt.target.closest('.picture')) {
    evt.preventDefault();


    // Показываем большое изображение
    elements.bigPicture.classList.remove('hidden');
    elements.body.classList.add('modal-open');

    // Вызов обработчика событий закрытия окна клавишей Esc
    document.addEventListener('keydown', onCloseBigPictureKeydown);
    // Вызов обработчика событий закрытия окна нажатием кнопки закрыть
    elements.btnCloseBigPicture.addEventListener('click', onCloseBigPictureClick);
  }
};

// Функция скрывает большое изображение по клику

function onCloseBigPictureClick() {
  elements.bigPicture.classList.add('hidden');
  elements.body.classList.remove('modal-open');
  // Вызываем функцию удвления обработчиков
  removeClickAndKeydownBigPicture();
}

// Функция скрывает большое изображение по нажатию клавиши

function onCloseBigPictureKeydown(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    onCloseBigPictureClick();
  }
  // Вызываем функцию удвления обработчиков
  removeClickAndKeydownBigPicture();
}


// Вызовы обработчикa событий открытия окна
elements.thumbnaiPicture.addEventListener('click', onOpenBigPictureClick);

// Экспорты функций

export { renderBigPicture };
