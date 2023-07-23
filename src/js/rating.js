//in progres

const getElement = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);

const openModalRatingBtn = getElement('#openModalRatingBtn');
const modalRating = getElement('#modal-rating-js');
const closeModalBtn = getElement('.close-rating-btn');
const ratingStars = getElements('.star-rating');
const valRating = getElement('.value-of-rating');
const emailInput = getElement('#emailInput');
const submitBtn = getElement('#submitBtn');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toggleModal = () => modalRating.classList.toggle('is-hidden');
const closeModal = () => modalRating.classList.add('is-hidden');

openModalRatingBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', closeModal);
modalRating.addEventListener('click', (event) => event.target === modalRating && closeModal());
document.addEventListener('keydown', (event) => event.key === 'Escape' && closeModal());

ratingStars.forEach(star => {
  star.addEventListener('click', function() {
    valRating.innerHTML = this.getAttribute('data-rating');
  });
});

submitBtn.addEventListener('click', function() {
  const emailValue = emailInput.value.trim();

  if (emailValue === '') {
    return;
  }

  if (!emailRegex.test(emailValue)) {
    return;
  }

  valRating.innerHTML = '0.0';
  emailInput.value = '';

  closeModal();
});