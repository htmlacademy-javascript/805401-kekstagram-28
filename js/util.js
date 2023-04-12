const isEscapeKeydown = (evt) => evt.key === 'Escape';

const renderElements = (elements, callback, container) => {
  const fragment = document.createDocumentFragment();

  elements.forEach((element) => {
    const template = callback(element);
    fragment.append(template);
  });

  container.append(fragment);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  isEscapeKeydown,
  renderElements,
  debounce
};
