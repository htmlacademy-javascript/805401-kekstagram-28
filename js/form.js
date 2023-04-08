// Импорты модулей

import { isEscapeKeydown } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { sendData } from './api.js';
import { showSuccessSendData, showErrorSendData } from './messages.js';

// Регулярное выражение для проверки хэш-тегов
const REGEXP_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
// Максимальное количество хэш-тегов
const HASHTAG_MAX_COUNT = 5;
//состояния для кнопок отправки формы
const SubmitButtonText = {
  TEXT_IDLE: 'Опубликовать',
  TEXT_SENDING: 'Загружаю...'
};

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
//кнопка отправки формы
const submitButton = document.querySelector('.img-upload__submit');

// Валидация формы Pristine

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Функция открывает форму для редактирования фото

const onOpenImgUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseImgUploadFormKeydown);
};

// Функция закрывает форму для редактирования фото

const onCloseImgUploadForm = () => {
  resetScale();
  resetEffect();
  imgUploadForm.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseImgUploadFormKeydown);
};

// Функция отменяет закрытие при активном поле хэш-тега или комментария к фотографии

const isFieldInFocus = () => document.activeElement === hashtagInput || document.activeElement === commentField;

// Функция закрывает окно при нажатии кнопки Esc

function onCloseImgUploadFormKeydown(evt) {
  if (isEscapeKeydown(evt) && !isFieldInFocus()) {
    evt.preventDefault();
    onCloseImgUploadForm();
  }
}

// Функция форматирует данные для проверки

const formatStringToArray = (string) => {
  const tags = string.toLowerCase().trim().split(' ').filter((arr) => arr.trim().length);
  return tags;
};

// Функция, проверяющая хэш-тег на соответствие с патерном

const isCheckValidationHashtag = (string) => {
  const pattern = REGEXP_HASHTAG;
  return pattern.test(string);
};

// Функция проверки валидности хэш-тегов

const isValidationHashtag = (string) => {
  const tags = formatStringToArray(string);
  return tags.every(isCheckValidationHashtag);
};

// Функция проверяет количество хэш-тегов

const isNumberOfHashtags = (value) => {
  const tags = formatStringToArray(value);
  return tags.length <= HASHTAG_MAX_COUNT;
};

// Функция проверяет одинаковые хэш-теги

const isHashtagNotDouble = (value) => {
  const tags = formatStringToArray(value);
  return new Set(tags).size === tags.length;
};

// Создаём валидаторы

pristine.addValidator(hashtagInput, isValidationHashtag, 'Неправильно введен #хэш-тег!');
pristine.addValidator(hashtagInput, isNumberOfHashtags, `Нельзя ввести больше ${HASHTAG_MAX_COUNT} #хэш-тегов`);
pristine.addValidator(hashtagInput, isHashtagNotDouble, 'Такой #хэш-тег уже существует, введите уникальный хештег');

// Открываем формы при выборе фото
imgUploadFile.addEventListener('change', onOpenImgUploadForm);
// Закрываем при нажатии на кнопку
imgUploadCancel.addEventListener('click', onCloseImgUploadForm);

// Блокирует кнопку при отправке
const lockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.TEXT_SENDING;
};

// Разблокирует кнопку отправки
const unlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.TEXT_IDLE;
};

// Функция обработчик на форму
const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      lockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessSendData)
        .catch(showErrorSendData)
        .finally(unlockSubmitButton);
    }
  });
};

export { setUserFormSubmit, onCloseImgUploadForm };
