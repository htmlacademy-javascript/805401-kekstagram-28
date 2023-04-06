// функция проверки срабатывания клавиши Esc

const isEscapeKeydown = (evt) => evt.key === 'Escape';

// Функция отрисовки элемента
// Принимает (1 элементы к которым применяет цикл, 2 функцию создающая шаблон, 3 контейнер для отрисовки элементов)

const renderElements = (elements, callback, container) => {

  // Создаём фрагмент
  const fragment = document.createDocumentFragment();
  // Цикл для элементов
  elements.forEach((element) => {
    // Присваиваем вызов функции отрисовки шаблона переменной
    const template = callback(element);
    // Отрисовываем шаблон в блок picture
    fragment.append(template);
  });
  // Отрисуем сгенерированные DOM-элементы в блок .pictures
  container.append(fragment);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Экспорты функций

export {
  isEscapeKeydown,
  renderElements,
  debounce
};
