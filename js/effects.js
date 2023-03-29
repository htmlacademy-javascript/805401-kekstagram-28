// Настройки фильтров
const FILTER_EFFECTS = [
  {
    name: 'none',
    filter: 'none',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    unit : ''
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit : ''
  },
  {
    name: 'sepia',
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit : ''
  },
  {
    name: 'marvin',
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    unit : '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    unit : 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    unit : ''
  }
];
// Значение по умолчанию
const DEFAULT_EFFECT = FILTER_EFFECTS[0];
// Текущее значение
let currentEffect = DEFAULT_EFFECT;

// Загруженная картинка
const previewPhotoImg = document.querySelector('.img-upload__preview img');
//список эффектов
const filtersEffectList = document.querySelector('.effects__list');
// Слайдер
const filtersEffectSlider = document.querySelector('.effect-level__slider');
// Значение слайдера
const filtersEffectValue = document.querySelector('.effect-level__value');
// Контейнер слайдера
const filtersEffectLevel = document.querySelector('.img-upload__effect-level');

// Функция приравнивает к значению по умолчанию
const isDefault = () => currentEffect === DEFAULT_EFFECT;

// Функция добавляет слайдер

const addSlider = () => {
  filtersEffectLevel.classList.remove('hidden');
};

// Функция убирает слайдер

const removeSlider = () => {
  filtersEffectLevel.classList.add('hidden');
};

// Функция обнавляет слайдер

const updateSlider = () => {
  filtersEffectSlider.noUiSlider.updateOptions({
    range: currentEffect.range,
    step: currentEffect.step,
    start: currentEffect.range.max,
  });

  if (isDefault()) {
    removeSlider();
  } else {
    addSlider();
  }
};


// Функция изменения эффектов

const onEffectChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = FILTER_EFFECTS.find((effect) => effect.name === evt.target.value);
  previewPhotoImg.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};


// Функция обнавляет положение ползунка слайдера

const onSliderUpdate = () => {
  const sliderValue = filtersEffectSlider.noUiSlider.get();
  filtersEffectValue.value = sliderValue;
  previewPhotoImg.style.filter = isDefault() ? DEFAULT_EFFECT.filter : `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
};


// Функция сбрасывает эффекты по умолчанию

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

// Создаём слайдер

noUiSlider.create(filtersEffectSlider, {
  range: DEFAULT_EFFECT.range,
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.range.max,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Убираем слайдер
removeSlider();

// Обработчик события изменения эффектов
filtersEffectList.addEventListener('change', onEffectChange);
// Обработчик событий на слайдер
filtersEffectSlider.noUiSlider.on('update', onSliderUpdate);

// Экспорты функций

export {resetEffect};
