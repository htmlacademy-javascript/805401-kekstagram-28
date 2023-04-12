const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
const DEFAULT_SCALE = 100;

const btnControllSmaller = document.querySelector('.scale__control--smaller');
const btnControllBigger = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
const previewPhotoImg = document.querySelector('.img-upload__preview img');

const getScaleValue = () => parseInt(inputScale.value, 10);

const scaleImage = (value) => {
  previewPhotoImg.style.transform = `scale(${value / MAX_SCALE})`;
  inputScale.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = getScaleValue();
  let newValue = currentValue - STEP_SCALE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = getScaleValue();
  let newValue = currentValue + STEP_SCALE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

btnControllSmaller.addEventListener('click', onSmallerButtonClick);
btnControllBigger.addEventListener('click', onBiggerButtonClick);

export { resetScale };
