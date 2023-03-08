import { getRandomPhotoGallery } from './data.js';

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// находим поле для вставки миниатюр
const picturesСontainer = document.querySelector('.pictures');
// Находим заголовок
const picturesTitle = picturesСontainer.querySelector('.pictures__title');

// Находим шаблон изображения
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Присваеваем вызов функции, переменнной pictureItem
const pictureElements = getRandomPhotoGallery();

// Создаём функцию отрисовки миниатюр
// Вопрос ?? Нужны ли этой функции аргументы или можно оставить так??
// Если аргументы нужны, то придется переменные экспортировать в main.js чтобы вызывать её оттуда с аргументами?? и правильно ли это??

const renderThumbnails = () => {

  // Не понял по макету, нужно ли отображать заголовок??
  // Показываем или убираем заголовок по условию
  if (picturesСontainer) {
    picturesTitle.classList.remove('visually-hidden');
  } else {
    picturesTitle.classList.add('visually-hidden');
  }

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

  // Отрисуем сгенерированные DOM-элементы в блок .pictures
  return picturesСontainer.append(anotherUserPhotoFragment);

};

export { renderThumbnails };

