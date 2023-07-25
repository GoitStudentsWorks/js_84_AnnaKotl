import { setRecipeRating } from './api-kay-js-files/api-rating';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';

const refs = {
  openModalBtn: document.querySelectorAll('.give-a-rating'),
  closeModalBtn: document.querySelectorAll('.close-rating-btn'),
  modal: document.querySelector('.modal-rating'), // Враховано, що .modal-rating - це окремий контейнер модального вікна
  form: document.querySelector('.modal-rating-content'), // Враховано, що .modal-rating-content містить всю форму
  idButton: document.getElementById('idButton'),
};

refs.openModalBtn.forEach(btn => btn.addEventListener('click', openModal));
refs.closeModalBtn.forEach(btn => btn.addEventListener('click', closeModal));
refs.form.addEventListener('submit', sendForm); // Використовуємо addEventListener, бо refs.form - це один елемент

function openModal(e) {
  e.preventDefault();
  document.addEventListener('keydown', keyDownRate);
  refs.modal.classList.remove('is-hidden');
  refs.modal.addEventListener('click', closeBackdrop);
  document.body.classList.add('modal-open');
}

function closeModal() {
  document.removeEventListener('keydown', keyDownRate);
  refs.modal.removeEventListener('click', closeBackdrop);
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
}

function closeBackdrop(e) {
  if (e.target === refs.modal) {
    closeModal();
  }
}

function clearRating() {
  const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');
  ratingIcons.forEach(icon => icon.classList.remove('active'));
}

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

function keyDownRate(e) {
  if (e.key === 'Escape') {
    closeModal();
    e.target.blur();
  }
}

async function sendForm(e) {
  try {
    e.preventDefault();
    const id = refs.idButton.getAttribute('data-recipe-id');
    const result = await setRecipeRating(id, getArgs(e.currentTarget.elements));
    if (!result) return Notiflix.Notify.failure('Send rating failure');
    Notiflix.Notify.success('Thank you for your rating');
    clearRating();
    refs.form.reset();
    toggleModal();
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

// stars
const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');
const ratingValueInput = document.getElementById('ratingValue');

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

    ratingValueInput.value = ratingValue;
  });
});



















// import { setRecipeRating } from './api-kay-js-files/api-rating';
// import Notiflix from 'notiflix';
// import 'notiflix/src/notiflix.css';

// const refs = {
//   openModalBtn: document.querySelectorAll('.give-a-rating'),
//   closeModalBtn: document.querySelectorAll('.close-rating-btn'),
//   modal: document.querySelectorAll('.modal-rating'),
//   form: document.querySelectorAll('.modal-rating-content'),
//   idButton: document.getElementById('idButton'),
// };

// refs.openModalBtn.forEach(btn => btn.addEventListener("click", openModal));
// refs.closeModalBtn.forEach(btn => btn.addEventListener("click", closeModal));
// refs.form.forEach(form => form.addEventListener('submit', sendForm));

// function openModal(e) {
//   e.preventDefault();
//   document.addEventListener('keydown', keyDownRate);
//   refs.modal.forEach(modal => {
//     if (modal.classList.contains("is-hidden")) {
//       modal.classList.remove("is-hidden");
//       modal.addEventListener('click', closeBackdrop);
//     }
//   });
// }

// function closeModal() {
//   document.removeEventListener('keydown', keyDownRate);
//   refs.modal.forEach(modal => modal.removeEventListener('click', closeBackdrop));
//   refs.modal.forEach(modal => modal.classList.add("is-hidden"));
// }

// function closeBackdrop(e) {
//   if (e.target === refs.modal) {
//     closeModal();
//   }
// }

// function clearRating() {
//   const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');
//   ratingIcons.forEach(icon => icon.classList.remove('active'));
// }

// function toggleModal() {
//   refs.modal.forEach(modal => modal.classList.toggle("is-hidden"));
// }

// function keyDownRate(e) {
//   if (e.key === 'Escape') {
//     closeModal();
//     e.target.blur();
//   }
// }

// async function sendForm(e) {
//   try {
//     e.preventDefault();
//     const id = refs.idButton.getAttribute('data-recipe-id');
//     const result = await setRecipeRating(id, getArgs(e.currentTarget.elements))
//     if (!result) return Notiflix.Notify.failure("Send rating failure");
//     Notiflix.Notify.success("Thank you for your rating");
//     clearRating()
//     refs.form.forEach(form => form.reset());
//     toggleModal();
//   } catch (err) {
//     onError(err);
//   }
// }

// function getArgs({ user_email, ratingValue }) {
//   if (user_email.value.trim() === "" || ratingValue.value < 1) return Notiflix.Notify.failure('Please fill in all the fields!');
//   return {
//     rate: Number(ratingValue.value),
//     email: user_email.value
//   };
// }

// function onError(error) {
//   Notiflix.Notify.failure(error.message);
// }

// // stars
// const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');
// const ratingValueInput = document.getElementById('ratingValue');

// ratingIcons.forEach(function (icon) {
//   icon.addEventListener('click', function () {
//     const ratingValue = this.getAttribute('data-rating');

//     ratingIcons.forEach(function (icon) {
//       if (icon.getAttribute('data-rating') <= ratingValue) {
//         icon.classList.add('active');
//       } else {
//         icon.classList.remove('active');
//       }
//     });

//     ratingValueInput.value = ratingValue;
//   });
// });