import { isEscapeKeydown } from './util.js';

const VISIBLE_COMMENT = 5;

const elements = {
  body: document.querySelector('body'),
  thumbnaiPicture: document.querySelector('.pictures'),
  bigPicture: document.querySelector('.big-picture'),
  btnCloseBigPicture: document.querySelector('.big-picture__cancel'),
  bigPictureImg: document.querySelector('.big-picture__img').querySelector('img'),
  socialCaption: document.querySelector('.social__caption'),
  likesCount: document.querySelector('.likes-count'),
  socialCommentCount: document.querySelector('.social__comment-count'),
  commentsCount: document.querySelector('.comments-count'),
  socialComments: document.querySelector('.social__comments'),
  socialComment: document.querySelector('.social__comment'),
  btnCommentsLoader: document.querySelector('.comments-loader'),
};

let visibleCommentsCount = VISIBLE_COMMENT;
let currentComments = [];

const createComment = ({ avatar, name, message }) => {

  const commentElement = elements.socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments,) => {
  const commentsFragment = document.createDocumentFragment();
  comments.slice(0, visibleCommentsCount).forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });
  elements.socialComments.innerHTML = '';
  elements.socialComments.append(commentsFragment);
  elements.socialCommentCount.textContent = `${visibleCommentsCount} из ${comments.length} комментариев`;
};

const onAddMoreCommentsClick = () => {
  visibleCommentsCount += VISIBLE_COMMENT;
  if (visibleCommentsCount >= currentComments.length) {
    visibleCommentsCount = currentComments.length;
    elements.btnCommentsLoader.classList.add('hidden');
    elements.btnCommentsLoader.removeEventListener('click', onAddMoreCommentsClick);
  }
  renderComments(currentComments);
};

const renderBigPicture = ({
  url,
  likes,
  description,
  comments
}) => {
  visibleCommentsCount = VISIBLE_COMMENT;
  elements.socialComments.innerHTML = '';
  elements.bigPictureImg.src = url;
  elements.likesCount.textContent = likes;
  elements.socialCaption.textContent = description;
  elements.commentsCount.textContent = comments.length;
  currentComments = comments;

  if (comments.length <= VISIBLE_COMMENT) {
    visibleCommentsCount = comments.length;
    elements.btnCommentsLoader.classList.add('hidden');
  } else {
    elements.btnCommentsLoader.classList.remove('hidden');
    elements.btnCommentsLoader.addEventListener('click', onAddMoreCommentsClick);
  }

  renderComments(comments);
};

const removeClickAndKeydownBigPicture = () => {
  document.removeEventListener('keydown', onCloseBigPictureKeydown);
  elements.btnCloseBigPicture.removeEventListener('click', onCloseBigPictureClick);
  elements.btnCommentsLoader.removeEventListener('click', onAddMoreCommentsClick);
};

const onOpenBigPictureClick = () => {
  elements.bigPicture.classList.remove('hidden');
  elements.body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseBigPictureKeydown);
  elements.btnCloseBigPicture.addEventListener('click', onCloseBigPictureClick);
};

function onCloseBigPictureClick() {
  elements.bigPicture.classList.add('hidden');
  elements.body.classList.remove('modal-open');

  removeClickAndKeydownBigPicture();
}

function onCloseBigPictureKeydown(evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    onCloseBigPictureClick();
  }

  removeClickAndKeydownBigPicture();
}

export { renderBigPicture, onOpenBigPictureClick };
