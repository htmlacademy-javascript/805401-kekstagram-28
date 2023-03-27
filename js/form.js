import { isEscapeKeydown } from './util.js';

// Находим body
const body = document.querySelector('body');
// Находим форму
const imgUploadForm = document.querySelector('#upload-select-image');
// Находим поле для загрузки файла
const imgUploadFile = imgUploadForm.querySelector('#upload-file');
// Форма редактирования изображения
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
// Поле для хештегов
const hashtagInput = document.querySelector('.text__hashtags');
// Поле для описаний
const commentField = document.querySelector('.text__description');
// Кнопка закрытия окна
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');

// Функция открывает форму для редактирования фото

const onOpenImgUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseImgUploadFormKeydown);
};

// Функция закрывает форму для редактирования фото

const onCloseImgUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseImgUploadFormKeydown);
};

// Функция отменяет закрытие при активном поле хэштэга или комментария к фотографии

const ifTheFieldInFocus = () => document.activeElement === hashtagInput || document.activeElement === commentField;

// Функция закрывает окно при нажатии кнопки Esc

function onCloseImgUploadFormKeydown(evt) {
  if (isEscapeKeydown(evt) && !ifTheFieldInFocus()) {
    evt.preventDefault();
    onCloseImgUploadForm();
  }
}

// Открываем формы при выборе фото
imgUploadFile.addEventListener('change', onOpenImgUploadForm);
// Закрываем при нажатии на кнопку
imgUploadCancel.addEventListener('click', onCloseImgUploadForm);
