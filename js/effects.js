// Настройки фильтров
const FILTER_EFFECTS = [
  {
    NAME: 'none',
    FILTER: 'none',
    RANGE: {
      min: 0,
      max: 100,
    },
    STEP: 1,
    UNIT: ''
  },
  {
    NAME: 'chrome',
    FILTER: 'grayscale',
    RANGE: {
      min: 0,
      max: 1,
    },
    STEP: 0.1,
    UNIT: ''
  },
  {
    NAME: 'sepia',
    FILTER: 'sepia',
    RANGE: {
      min: 0,
      max: 1,
    },
    STEP: 0.1,
    UNIT: ''
  },
  {
    NAME: 'marvin',
    FILTER: 'invert',
    RANGE: {
      min: 0,
      max: 100,
    },
    STEP: 1,
    UNIT: '%'
  },
  {
    NAME: 'phobos',
    FILTER: 'blur',
    RANGE: {
      min: 0,
      max: 3,
    },
    STEP: 0.1,
    UNIT: 'px'
  },
  {
    NAME: 'heat',
    FILTER: 'brightness',
    RANGE: {
      min: 1,
      max: 3,
    },
    STEP: 0.1,
    UNIT: ''
  }
];
// Значение по умолчанию
const DEFAULT_EFFECT = FILTER_EFFECTS[0];

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
// Текущее значение
let currentEffect = DEFAULT_EFFECT;

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
    range: currentEffect.RANGE,
    step: currentEffect.STEP,
    start: currentEffect.RANGE.max,
  });

  if (isDefault()) {
    removeSlider();
  } else {
    addSlider();
  }
};


// Функция изменения эффектов

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = FILTER_EFFECTS.find((effect) => effect.NAME === evt.target.value);
  previewPhotoImg.className = `effects__preview--${currentEffect.NAME}`;
  updateSlider();
};


// Функция обнавляет положение ползунка слайдера

const onSliderUpdate = () => {
  const sliderValue = filtersEffectSlider.noUiSlider.get();
  filtersEffectValue.value = sliderValue;
  previewPhotoImg.style.filter = isDefault() ? DEFAULT_EFFECT.FILTER : `${currentEffect.FILTER}(${sliderValue}${currentEffect.UNIT})`;
};


// Функция сбрасывает эффекты по умолчанию

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

// Создаём слайдер

noUiSlider.create(filtersEffectSlider, {
  range: DEFAULT_EFFECT.RANGE,
  step: DEFAULT_EFFECT.STEP,
  start: DEFAULT_EFFECT.RANGE.max,
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

export { resetEffect };
