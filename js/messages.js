// Импорты модулей

import { isEscapeKeydown } from './util.js';

const DELAY_TIME = 5000;
// Шаблон ошибки
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
// Шаблон успешной отправки
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');


// Функция отрисовывает ошибку при получении данных

const showErrorGetData = (error) => {
  // Клонируем шаблон
  const messageTemp = errorMessageTemplate.cloneNode(true);
  // Находим заголовок ошибки и присваем аргумент функции
  messageTemp.querySelector('.error__title').textContent = error;
  // Обработчик события по нажатию клавиши ESC
  document.addEventListener('keydown', onEscapeKeyDownForErrorMessage);
  // Скрываем кнопку
  messageTemp.querySelector('.error__button').classList.add('hidden');
  // Отрисовываем шаблон и убираем его функцией setTimeout через 5 секунд
  document.body.append(messageTemp);
  setTimeout(() => {
    messageTemp.remove();
  }, DELAY_TIME);
};

// Функция закрывает окно ошибки

const closeErrorPopup = () => {
  document.removeEventListener('keydown', onEscapeKeyDownForErrorMessage);
  const errorPopup = document.querySelector('.error');
  errorPopup.remove();
};

// Функция закрывает окно ошибки по клику в любой области

const onOutSideErrorClick = (evt) => {
  const errorPopup = document.querySelector('.error__inner');
  if (evt.target !== errorPopup) {
    closeErrorPopup();
  }
};

// Функция отрисовывает ошибку

const showErrorSendData = () => {
  const messageTemp = errorMessageTemplate.cloneNode(true);

  messageTemp.querySelector('.error__button').addEventListener('click', closeErrorPopup);
  document.addEventListener('keydown', onEscapeKeyDownForErrorMessage);
  document.addEventListener('click', onOutSideErrorClick, { once: true });

  document.body.append(messageTemp);
};

// Функция закрывает окно ошибки нажатием клавиши ESC

function onEscapeKeyDownForErrorMessage(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
}

// Функция закрывает окно успешной отправки данных

const onCloseSuccessPopupClick = () => {
  document.removeEventListener('keydown', onEscapeKeyDownForSuccessMessage);
  const successPopup = document.querySelector('.success');
  successPopup.remove();
};

// Функция закрывает окно по клику вне окна

const onOutSideSuccessClick = (evt) => {
  const successPopup = document.querySelector('.success__inner');
  if (evt.target !== successPopup) {
    onCloseSuccessPopupClick();
  }
};

// Функция отрисовывает сообщение об успешной отправке

const showSuccessSendData = () => {
  // Клонируем шаблон
  const messageTemp = successMessageTemplate.cloneNode(true);
  // Находим кнопку и вешаем на неё обработчик событий по клику
  messageTemp.querySelector('.success__button').addEventListener('click', onCloseSuccessPopupClick);
  // Обработчик событий по нажатию ESC
  document.addEventListener('keydown', onEscapeKeyDownForSuccessMessage);
  // O,hf,jnxbr события по клику
  document.addEventListener('click', onOutSideSuccessClick, { once: true });
  // Отрисовываем шаблон
  document.body.append(messageTemp);
};

// Функция закрывает окно успешной отправки нажатием клавиши ESC

function onEscapeKeyDownForSuccessMessage(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    onCloseSuccessPopupClick();
  }
}

// Экспорты функций

export { showErrorGetData, showSuccessSendData, showErrorSendData };
