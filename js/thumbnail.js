

// находим поле для вставки миниатюр
const picturesСontainer = document.querySelector('.pictures');
// Находим шаблон изображения
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//функция создающая шаблон

const createThumbnail = ({url, likes, comments, description, id}) => {
  // Клонируем шаблон
  const pictureElement = pictureTemplate.cloneNode(true);

  // Находим элемент изображения и записываем в переменную чтобы использовть его свойства
  const imageElement = pictureElement.querySelector('.picture__img');
  // Находим изображения
  imageElement.src = url;
  // Находим подписи изображений
  imageElement.alt = description;

  // Находим количество коментариев
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  // Находим количество лайков
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.dataset.thumbnailId = id;

  return pictureElement;
};

export { createThumbnail, picturesСontainer };

