import { renderElements } from './util.js';
import { renderBigPicture } from './big-picture.js';
import { createThumbnail } from './thumbnail.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    renderBigPicture(picture);
  });

  renderElements(pictures,createThumbnail, container);
};

export { renderGallery };
