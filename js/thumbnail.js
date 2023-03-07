import { getRandomPhotoGallery, getRandomMessagesGallery } from './data.js';

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

const picture = document.querySelector('.pictures');
const pictureTitle = picture.querySelector('.pictures__title');

// Временно показываем блок изображений
pictureTitle.classList.remove('visually-hidden');

// Находим шаблон изображения
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureItoms = getRandomPhotoGallery();

pictureItoms.forEach((element) => {
  // Клонируем шаблон
  const pictureElement = pictureTemplate.cloneNode(true);
  // Находим изображения
  pictureElement.querySelector('.picture__img').src = element.url;
  // Находим количество коментариев
  pictureElement.querySelector('.picture__comments').textContent = element.comments.length;
  // Находим количество лайков
  pictureElement.querySelector('.picture__likes').textContent = element.likes;

  // Отрисовываем шаблон в блок picture
  picture.append(pictureElement);

  console.log(pictureElement);
});




// Адрес изображения url подставьте как атрибут src изображения.

// Количество лайков likes выведите в блок .picture__likes.

// Количество комментариев comments выведите в блок .picture__comments.

// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

