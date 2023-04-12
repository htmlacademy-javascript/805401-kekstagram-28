// Импорты модулей

import { debounce } from './util.js';
import { renderGallery } from './gallery.js';

// Задержка в милисекундах
const DELAY_MS = 500;
// Номер для отображения
const NUMBER_TO_SHOW = 10;

// Контейнер с фильтрами
const filterContainer = document.querySelector('.img-filters');
// Форма с кнопками переключения фильтров
const filterForm = filterContainer.querySelector('.img-filters__form');
// Кнопка по умолчанию
const filterButtonDefault = filterForm.querySelector('#filter-default');
// Кнопка фильтра случайного выбора
const filterButtonRandom = filterForm.querySelector('#filter-random');
// Кнопка фильтра обсуждаемые
const filterButtonDiscussed = filterForm.querySelector('#filter-discussed');
// Текущая кнопка
let currentButton = filterButtonDefault;

// Функция удаление изображений

const removePictures = (pictures) => pictures.forEach((picture) => picture.remove());

// Функция сортировка по числу комментариев

const sortDescByCommentCount = (a, b) => b.comments.length - a.comments.length;

// Функция случайной сортировки

const sortRandom = () => Math.random() - 0.5;

// Функция применяемого фильтра

const applyFilter = (pictures) => {
  if (currentButton === filterButtonDefault) {
    return pictures;
  } else if (currentButton === filterButtonRandom) {
    return pictures.slice().sort(sortRandom).slice(0, NUMBER_TO_SHOW);
  } else if (currentButton === filterButtonDiscussed) {
    return pictures.slice().sort(sortDescByCommentCount);
  }
};

// Функция нажатия на кнопку фильтра

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

// Функция показа отфильтрованных изображений

const showFilteredPictures = (photos) => {
  filterContainer.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', debounce((evt) => {
    onFilterButtonClick(evt, photos);
  }, DELAY_MS));
};

// Экспорты функций

export { showFilteredPictures };
