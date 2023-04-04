import { isEscapeKeydown } from './util.js';

// Шаблон ошибки
const messageError = document.querySelector('#error').content.querySelector('.error');
// Шаблон успешной отправки
const messageSuccess = document.querySelector('#success').content.querySelector('.success');


// Функция отрисовывает ошибку при получении данных

const showErrorGetData = (error) => {
  // Клонируем шаблон
  const messageTemp = messageError.cloneNode(true);
  // Находим заголовок ошибки и присваем аргумент функции
  messageTemp.querySelector('.error__title').textContent = error;
  // Обработчик события по нажатию клавиши ESC
  document.addEventListener('keydown', onDocumentKeydownError);
  // Скрываем кнопку
  messageTemp.querySelector('.error__button').classList.add('hidden');
  // Отрисовываем шаблон и убираем его функцией setTimeout через 5 секунд
  document.body.append(messageTemp);
  setTimeout(() => {
    messageTemp.remove();
  }, 5000);
};

// Функция закрывает окно ошибки

const closeErrorPopup = () => {
  document.removeEventListener('keydown', onDocumentKeydownError);
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
  const messageTemp = messageError.cloneNode(true);

  messageTemp.querySelector('.error__button').addEventListener('click', closeErrorPopup);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click', onOutSideErrorClick, { once: true });

  document.body.append(messageTemp);
};

// Функция закрывает окно ошибки нажатием клавиши ESC

function onDocumentKeydownError(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
}

// Функция закрывает окно успешной отправки данных

const closeSuccessPopup = () => {
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  const successPopup = document.querySelector('.success');
  successPopup.remove();
};

// Функция закрывает окно по клику вне окна

const onOutSideSuccessClick = (evt) => {
  const successPopup = document.querySelector('.success__inner');
  if (evt.target !== successPopup) {
    closeSuccessPopup();
  }
};

// Функция отрисовывает сообщение об успешной отправке

const showSuccessSendData = () => {
  // Клонируем шаблон
  const messageTemp = messageSuccess.cloneNode(true);
  // Находим кнопку и вешаем на неё обработчик событий по клику
  messageTemp.querySelector('.success__button').addEventListener('click', closeSuccessPopup);
  // Обработчик событий по нажатию ESC
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  // O,hf,jnxbr события по клику
  document.addEventListener('click', onOutSideSuccessClick, { once: true });
  // Отрисовываем шаблон
  document.body.append(messageTemp);
};

// Функция закрывает окно успешной отправки нажатием клавиши ESC

function onDocumentKeydownSuccess(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
}

// Экспорты функций

export { showErrorGetData, showSuccessSendData, showErrorSendData };
