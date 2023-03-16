import { renderBigPictureAndOpenFullScreen } from './big-picture.js';

// находим поле для вставки миниатюр
const picturesСontainer = document.querySelector('.pictures');
// Находим шаблон изображения
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//функция создающая шаблон

const createThumbnail = (picture) => {

  // Клонируем шаблон
  const pictureElement = pictureTemplate.cloneNode(true);
  // Находим изображения
  pictureElement.querySelector('.picture__img').src = picture.url;
  // Находим подписи изображений
  pictureElement.querySelector('.picture__img').alt = picture.description;
  // Находим количество коментариев
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  // Находим количество лайков
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  pictureElement.addEventListener('click', () => {
    renderBigPictureAndOpenFullScreen(picture);
  });

  return pictureElement;
};

// Функция отрисовки миниатюр

const renderThumbnails = (piсtures) => {

  // Создаём фрагмент
  const anotherUserPhotoFragment = document.createDocumentFragment();
  // Цикл для миниатюр
  piсtures.forEach((picture) => {
    // Присваиваем вызов функции отрисовки шаблона переменной
    const thumbnail = createThumbnail(picture);
    // Отрисовываем шаблон в блок picture
    anotherUserPhotoFragment.append(thumbnail);
  });

  // Отрисуем сгенерированные DOM-элементы в блок .pictures
  picturesСontainer.append(anotherUserPhotoFragment);

};

export { renderThumbnails };

