import { renderGallery } from './gallery.js';
const BASE_URL = 'https://28.javascript.pages.academy/kekstagram/data';

fetch(`${BASE_URL}`)
  .then((response) => response.json())
  .then((data) => {
    renderGallery(data);
  });

