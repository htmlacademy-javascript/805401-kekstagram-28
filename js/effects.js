const FILTER_EFFECTS = {
  none: {
    NAME: 'none',
    FILTER: 'none',
    RANGE: {
      min: 0,
      max: 100,
    },
    STEP: 1,
    UNIT: ''
  },
  chrome: {
    NAME: 'chrome',
    FILTER: 'grayscale',
    RANGE: {
      min: 0,
      max: 1,
    },
    STEP: 0.1,
    UNIT: ''
  },
  sepia: {
    NAME: 'sepia',
    FILTER: 'sepia',
    RANGE: {
      min: 0,
      max: 1,
    },
    STEP: 0.1,
    UNIT: ''
  },
  marvin: {
    NAME: 'marvin',
    FILTER: 'invert',
    RANGE: {
      min: 0,
      max: 100,
    },
    STEP: 1,
    UNIT: '%'
  },
  phobos: {
    NAME: 'phobos',
    FILTER: 'blur',
    RANGE: {
      min: 0,
      max: 3,
    },
    STEP: 0.1,
    UNIT: 'px'
  },
  heat: {
    NAME: 'heat',
    FILTER: 'brightness',
    RANGE: {
      min: 1,
      max: 3,
    },
    STEP: 0.1,
    UNIT: ''
  }
};

const DEFAULT_EFFECT = FILTER_EFFECTS.none;

const previewPhotoImg = document.querySelector('.img-upload__preview img');
const filtersEffectList = document.querySelector('.effects__list');
const filtersEffectSlider = document.querySelector('.effect-level__slider');
const filtersEffectValue = document.querySelector('.effect-level__value');
const filtersEffectLevel = document.querySelector('.img-upload__effect-level');

let currentEffect = DEFAULT_EFFECT;

const isDefault = () => currentEffect === DEFAULT_EFFECT;


const addSlider = () => {
  filtersEffectLevel.classList.remove('hidden');
};

const removeSlider = () => {
  filtersEffectLevel.classList.add('hidden');
};

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

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = FILTER_EFFECTS[evt.target.value];
  previewPhotoImg.className = `effects__preview--${currentEffect.NAME}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = filtersEffectSlider.noUiSlider.get();
  filtersEffectValue.value = sliderValue;
  previewPhotoImg.style.filter = isDefault() ? DEFAULT_EFFECT.FILTER : `${currentEffect.FILTER}(${sliderValue}${currentEffect.UNIT})`;
};

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

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

removeSlider();

filtersEffectList.addEventListener('change', onEffectChange);
filtersEffectSlider.noUiSlider.on('update', onSliderUpdate);

export { resetEffect };
