// Минимальное значение масштаба
const MIN_SCALE = 25;
// Максимальное значение масштаба
const MAX_SCALE = 100;
// Шаг изменения масштаба
const STEP_SCALE = 25;
// Значение масштаба по умолчани.
const DEFAULT_SCALE = 100;


// Кнопка уменьшения масштаба
const btnControllSmaller = document.querySelector('.scale__control--smaller');
// Кнопка увеличения масштаба
const btnControllBigger = document.querySelector('.scale__control--bigger');
// Поле с масштабом
const inputScale = document.querySelector('.scale__control--value');
// Загруженная картинка
const previewPhotoImg = document.querySelector('.img-upload__preview img');

// Функция получает текущее значение масштаба
const getScaleValue = () => parseInt(inputScale.value, 10);

// Функция масштабирует фото

const scaleImage = (value) => {
  previewPhotoImg.style.transform = `scale(${value / 100})`;
  inputScale.value = `${value}%`;
};

// Функция уменьшает масштаб

const onSmallerButtonClick = () => {
  const currentValue = getScaleValue();
  let newValue = currentValue - STEP_SCALE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

// Функция увиличивает масштаб

const onBiggerButtonClick = () => {
  const currentValue = getScaleValue();
  let newValue = currentValue + STEP_SCALE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

// Функция сбрасывает масштаб до значения по умолчанию
const resetScale = () => scaleImage(DEFAULT_SCALE);

// Обработчик событий на кнопку уменьшения изображения
btnControllSmaller.addEventListener('click', onSmallerButtonClick);
// Обработчик событий на кнопку увеличения изображения
btnControllBigger.addEventListener('click', onBiggerButtonClick);

export { resetScale };
