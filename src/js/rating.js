import { setRecipeRating } from './api-kay-js-files/api-rating';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';

const refs = {
  // openRatingModalBtn: document.querySelectorAll('.give-a-rating'),
  closeModalBtn: document.querySelectorAll('.close-rating-btn'),
  modalRatingCont: document.querySelector('.modal-rating'),
  formRatingModal: document.querySelector('.modal-rating-content'),
  idButtonRatingSubmit: document.getElementById('idButton'),
};

// refs.openRatingModalBtn.forEach(btn => btn.addEventListener('click', openModalRating));
refs.closeModalBtn.forEach(btn => btn.addEventListener('click', closeModalRating));
refs.formRatingModal.addEventListener('submit', sendForm);

export function openModalRating(e) {
  e.preventDefault();
  document.addEventListener('keydown', keyDownRate);
  refs.modalRatingCont.classList.remove('is-hidden');
  refs.modalRatingCont.addEventListener('click', closeBackdropRating);
  document.body.classList.add('modal-open');

  clearRatingModalValue();
  setRatingValue(0.0);
}

function closeModalRating() {
  document.removeEventListener('keydown', keyDownRate);
  refs.modalRatingCont.removeEventListener('click', closeBackdropRating);
  refs.modalRatingCont.classList.add('is-hidden');
  document.body.classList.remove('modal-open');

  clearRatingModalValue();
  setRatingValue(0.0);
  clearEmailInput();
}

function closeBackdropRating(e) {
  if (e.target === refs.modal) {
    closeModalRating();
  }
}

function clearEmailInput() {
  const emailInput = document.getElementById('emailInput');
  emailInput.value = '';
}

function clearRatingModalValue() {
  const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');
  ratingIcons.forEach(icon => icon.classList.remove('active'));
}

function toggleModal() {
  refs.modalRatingCont.classList.toggle('is-hidden');
}

function keyDownRate(e) {
  if (e.key === 'Escape') {
    closeModalRating();
    e.target.blur();
  }
}

async function sendForm(e) {
  try {
    e.preventDefault();
    const id = refs.idButtonRatingSubmit.getAttribute('data-recipe-id');
    const result = await setRecipeRating(id, getArgs(e.currentTarget.elements));
    if (!result) return Notiflix.Notify.failure('Send rating failure');
    Notiflix.Notify.success('Thank you for your rating');
    clearRatingModalValue();
    refs.formRatingModal.reset();
    toggleModal();
    clearEmailInput();
  } catch (err) {
    onError(err);
  }
}

function getArgs({ 'user-email-for-rating': user_email, ratingValue }) {
  if (user_email.value.trim() === '' || ratingValue.value < 1)
    return Notiflix.Notify.failure('Please fill in all the fields!');
  return {
    rate: Number(ratingValue.value),
    email: user_email.value,
  };
}

function onError(error) {
  Notiflix.Notify.failure(error.message);
}

function setRatingValue(ratingValue) {
  const ratingValueInput = document.getElementById('ratingValue');
  ratingValueInput.value = ratingValue;
}

// stars
const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');

ratingIcons.forEach(function (icon) {
  icon.addEventListener('click', function () {
    const ratingValue = this.getAttribute('data-rating');

    ratingIcons.forEach(function (icon) {
      if (icon.getAttribute('data-rating') <= ratingValue) {
        icon.classList.add('active');
      } else {
        icon.classList.remove('active');
      }
    });
    setRatingValue(ratingValue);
  });
});
