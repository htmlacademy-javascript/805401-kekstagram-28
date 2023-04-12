import { getData } from './api.js';
import { renderGallery } from './gallery.js';
import { setUserFormSubmit, onCloseImgUploadForm } from './form.js';
import { showErrorGetData } from './messages.js';
import { showFilteredPictures } from './filters.js';
import { selectPictureToPreview } from './preview-pictures.js';

getData()
  .then((photos) => {
    renderGallery(photos);
    showFilteredPictures(photos);
  })
  .catch(
    (err) => {
      showErrorGetData(err.message);
    }
  );

setUserFormSubmit(onCloseImgUploadForm);
selectPictureToPreview();
