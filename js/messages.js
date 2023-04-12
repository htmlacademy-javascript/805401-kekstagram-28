import { isEscapeKeydown } from './util.js';

const DELAY_TIME = 5000;

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const showErrorGetData = (error) => {
  const messageTemp = errorMessageTemplate.cloneNode(true);
  messageTemp.querySelector('.error__title').textContent = error;
  document.addEventListener('keydown', onEscapeKeyDownForErrorMessage);
  messageTemp.querySelector('.error__button').classList.add('hidden');
  document.body.append(messageTemp);
  setTimeout(() => {
    messageTemp.remove();
  }, DELAY_TIME);
};

const closeErrorPopup = () => {
  document.removeEventListener('keydown', onEscapeKeyDownForErrorMessage);
  const errorPopup = document.querySelector('.error');
  errorPopup.remove();
};

const onOutSideErrorClick = (evt) => {
  const errorPopup = document.querySelector('.error__inner');
  if (evt.target !== errorPopup) {
    closeErrorPopup();
  }
};

const showErrorSendData = () => {
  const messageTemp = errorMessageTemplate.cloneNode(true);

  messageTemp.querySelector('.error__button').addEventListener('click', closeErrorPopup);
  document.addEventListener('keydown', onEscapeKeyDownForErrorMessage);
  document.addEventListener('click', onOutSideErrorClick, { once: true });

  document.body.append(messageTemp);
};

function onEscapeKeyDownForErrorMessage(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
}

const onCloseSuccessPopupClick = () => {
  document.removeEventListener('keydown', onEscapeKeyDownForSuccessMessage);
  const successPopup = document.querySelector('.success');
  successPopup.remove();
};

const onOutSideSuccessClick = (evt) => {
  const successPopup = document.querySelector('.success__inner');
  if (evt.target !== successPopup) {
    onCloseSuccessPopupClick();
  }
};

const showSuccessSendData = () => {
  const messageTemp = successMessageTemplate.cloneNode(true);

  messageTemp.querySelector('.success__button').addEventListener('click', onCloseSuccessPopupClick);
  document.addEventListener('keydown', onEscapeKeyDownForSuccessMessage);
  document.addEventListener('click', onOutSideSuccessClick, { once: true });
  document.body.append(messageTemp);
};

function onEscapeKeyDownForSuccessMessage(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    onCloseSuccessPopupClick();
  }
}

export { showErrorGetData, showSuccessSendData, showErrorSendData };
