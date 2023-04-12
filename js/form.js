import { isEscapeKeydown } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { sendData } from './api.js';
import { showSuccessSendData, showErrorSendData } from './messages.js';

const REGEXP_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_COUNT = 5;

const SubmitButtonText = {
  TEXT_IDLE: 'Опубликовать',
  TEXT_SENDING: 'Загружаю...'
};

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('#upload-select-image');
const imgUploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onOpenImgUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseImgUploadFormKeydown);
};

const onCloseImgUploadForm = () => {
  resetScale();
  resetEffect();
  imgUploadForm.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseImgUploadFormKeydown);
};

const isFieldInFocus = () => document.activeElement === hashtagInput || document.activeElement === commentField;

function onCloseImgUploadFormKeydown(evt) {
  const errorPopup = document.querySelector('.error');
  if (!errorPopup && isEscapeKeydown(evt) && !isFieldInFocus()) {
    evt.preventDefault();
    onCloseImgUploadForm();
  }
}

const formatStringToArray = (string) => {
  const tags = string.toLowerCase().trim().split(' ').filter((arr) => arr.trim().length);
  return tags;
};

const isCheckValidationHashtag = (string) => {
  const pattern = REGEXP_HASHTAG;
  return pattern.test(string);
};

const isValidationHashtag = (string) => {
  const tags = formatStringToArray(string);
  return tags.every(isCheckValidationHashtag);
};

const isNumberOfHashtags = (value) => {
  const tags = formatStringToArray(value);
  return tags.length <= HASHTAG_MAX_COUNT;
};

const isHashtagNotDouble = (value) => {
  const tags = formatStringToArray(value);
  return new Set(tags).size === tags.length;
};

pristine.addValidator(hashtagInput, isValidationHashtag, 'Неправильно введен #хэш-тег!', 3 , true);
pristine.addValidator(hashtagInput, isNumberOfHashtags, `Нельзя ввести больше ${HASHTAG_MAX_COUNT} #хэш-тегов`, 2 ,true);
pristine.addValidator(hashtagInput, isHashtagNotDouble, '#хэш-тег не должен повторятся, введите уникальный хештег', 1 , true);

imgUploadFile.addEventListener('change', onOpenImgUploadForm);
imgUploadCancel.addEventListener('click', onCloseImgUploadForm);

const lockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.TEXT_SENDING;
};

const unlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.TEXT_IDLE;
};

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
