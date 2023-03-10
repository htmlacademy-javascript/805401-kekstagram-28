import { getRandomPhotoGallery } from './data.js';

// находим поле для вставки миниатюр
const picturesСontainer = document.querySelector('.pictures');
// Находим заголовок
const picturesTitle = picturesСontainer.querySelector('.pictures__title');
// Находим шаблон изображения
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Присваеваем вызов функции, переменнной pictureItem
const pictureElements = getRandomPhotoGallery();

// Создаём функцию отрисовки миниатюр

const renderThumbnails = () => {

  // Создаём фрагмент
  const anotherUserPhotoFragment = document.createDocumentFragment();

  pictureElements.forEach(({ url, comments, likes }) => {

    // Клонируем шаблон
    const pictureElement = pictureTemplate.cloneNode(true);
    // Находим изображения
    pictureElement.querySelector('.picture__img').src = url;
    // Находим количество коментариев
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    // Находим количество лайков
    pictureElement.querySelector('.picture__likes').textContent = likes;

    // Отрисовываем шаблон в блок picture
    anotherUserPhotoFragment.append(pictureElement);
  });

  // Показываем заголовок
  picturesTitle.classList.remove('visually-hidden');

  // Отрисуем сгенерированные DOM-элементы в блок .pictures
  return picturesСontainer.append(anotherUserPhotoFragment);

};

export { renderThumbnails };

