// Адрес получаемых данных
const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

// Заглушки для методов
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// Методы
const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Текст ошибок для методов
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

// Функция получает и отправляет данные

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

// Функция получает данные

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

// Функция отправляет данные

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

// экспорты функций

export { getData, sendData };


