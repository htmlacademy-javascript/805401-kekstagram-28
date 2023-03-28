import { isEscapeKeydown } from './util.js';

// Регулярное выражение для проверки хэш-тегов
const REGEXP_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
// Максимальное количество хэш-тегов
const HASHTAG_MAX_COUNT = 5;

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

// Функция отменяет закрытие при активном поле хэш-тега или комментария к фотографии

const ifTheFieldInFocus = () => document.activeElement === hashtagInput || document.activeElement === commentField;

// Функция закрывает окно при нажатии кнопки Esc

function onCloseImgUploadFormKeydown(evt) {
  if (isEscapeKeydown(evt) && !ifTheFieldInFocus()) {
    evt.preventDefault();
    onCloseImgUploadForm();
  }
}

// Валидация формы Pristine

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Функция форматирует данные для проверки

const formatStringToArray = (string) => {
  const array = string.trim().split(' ').filter((arr) => arr.trim().length);
  return array;
};

// Функция, проверяющая хэш-тег на соответствие с патерном

const checkedValidationHashtag = (string) => {
  const pattern = REGEXP_HASHTAG;
  return pattern.test(string);
};

// Функция проверки валидности хэш-тегов

const validationHashtag = (string) => {
  const array = formatStringToArray(string);
  return array.every(checkedValidationHashtag);
};

// Функция проверяет количество хэш-тегов

const validationTheNumberOfHashtags = (value) => {
  const array = formatStringToArray(value);
  return array.length <= HASHTAG_MAX_COUNT;
};

// Функция проверяет одинвковые хэш-теги

const validationDubleHashtags = (value) => {
  const array = formatStringToArray(value);
  return new Set(array).size === array.length;
};

// Создаём валидаторы

pristine.addValidator(hashtagInput, validationHashtag, 'Неправильно введен #хэш-тег!');
pristine.addValidator(hashtagInput, validationTheNumberOfHashtags, `Нельзя ввести больше ${HASHTAG_MAX_COUNT} #хэш-тегов`);
pristine.addValidator(hashtagInput, validationDubleHashtags, 'Такой #хэш-тег уже существует, введите уникальный хештег');

// Функция проверки валидации формы перед отправкой

const onImgUploadForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadForm.submit();
  }
};

// Открываем формы при выборе фото
imgUploadFile.addEventListener('change', onOpenImgUploadForm);
// Закрываем при нажатии на кнопку
imgUploadCancel.addEventListener('click', onCloseImgUploadForm);
// Отправка формы при валидном вводе данных
imgUploadForm.addEventListener('submit', onImgUploadForm);