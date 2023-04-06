// Расширения файлов доступных для загрузки
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Поле ввода для загрузки изображения
const fileChooser = document.querySelector('.img-upload__input');
// Контейнер предварительного просмотра изображения
const preview = document.querySelector('.img-upload__preview img');

const selectPictureToPreview = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

export { selectPictureToPreview };
