import { renderElements } from './util.js';
import { renderBigPicture, onOpenBigPictureClick } from './big-picture.js';
import { createThumbnail } from './thumbnail.js';

const picturesConteiner = document.querySelector('.pictures');

let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');

  if (!thumbnail) {
    return;
  }

  const picture = pictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId
  );
  evt.preventDefault();
  renderBigPicture(picture);
  onOpenBigPictureClick();
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderElements(pictures, createThumbnail, picturesConteiner);
  picturesConteiner.addEventListener('click', onContainerClick);
};

export { renderGallery };
