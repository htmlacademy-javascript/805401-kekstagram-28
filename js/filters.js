import { debounce } from './util.js';
import { renderGallery } from './gallery.js';

const DELAY_MS = 500;
const NUMBER_TO_SHOW = 10;

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const filterButtonDefault = filterForm.querySelector('#filter-default');
const filterButtonRandom = filterForm.querySelector('#filter-random');
const filterButtonDiscussed = filterForm.querySelector('#filter-discussed');
let currentButton = filterButtonDefault;

const removePictures = (pictures) => pictures.forEach((picture) => picture.remove());

const sortDescByCommentCount = (a, b) => b.comments.length - a.comments.length;

const sortRandom = () => Math.random() - 0.5;

const applyFilter = (pictures) => {
  if (currentButton === filterButtonDefault) {
    return pictures;
  } else if (currentButton === filterButtonRandom) {
    return pictures.slice().sort(sortRandom).slice(0, NUMBER_TO_SHOW);
  } else if (currentButton === filterButtonDiscussed) {
    return pictures.slice().sort(sortDescByCommentCount);
  }
};

const onFilterButtonClick = (evt, photos) => {
  const images = document.querySelectorAll('.picture');
  if (evt.target.nodeName === 'FORM') {
    return;
  }
  currentButton.classList.remove('img-filters__button--active');
  currentButton = evt.target;
  currentButton.classList.add('img-filters__button--active');
  removePictures(images);
  renderGallery(applyFilter(photos));
};

const showFilteredPictures = (photos) => {
  filterContainer.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', debounce((evt) => {
    onFilterButtonClick(evt, photos);
  }, DELAY_MS));
};

export { showFilteredPictures };
