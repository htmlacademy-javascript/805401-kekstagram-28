// Импорты модулей

// import { getRandomPhotoGallery } from './data.js';
import {getData} from './api.js';
import { renderGallery } from './gallery.js';
import './form.js';
import './api.js';

// renderGallery(getRandomPhotoGallery());

getData()
  .then((photos) => {
    renderGallery(photos);
  });

