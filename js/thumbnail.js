const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ url, likes, comments, description, id }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');
  imageElement.src = url;
  imageElement.alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.dataset.thumbnailId = id;

  return pictureElement;
};

export { createThumbnail };

