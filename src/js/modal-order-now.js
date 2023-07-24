// Js для відкриття/закриття модального вікна

const openModalBtn = document.getElementById('openModalOrderNowBtn');
const closeModalBtn = document.getElementById('closeModalOrderNowBtn');
const modal = document.getElementById('modalordernow');

function openModalOrderNow() {
  modal.classList.add('open');
}

function closeModalOrderNow() {
  modal.classList.remove('open');
}

openModalBtn.addEventListener('click', openModalOrderNow);
closeModalBtn.addEventListener('click', closeModalOrderNow);

//Js для відправки введених даних на бекенд

const feedbackForm = document.querySelector('.ordernow-form');
const nameInput = feedbackForm.querySelector('input[name="name"]');
const phoneInput = feedbackForm.querySelector('input[name="phone"]');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

feedbackForm.addEventListener('input', () => {
  const formData = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

const savedFormData = localStorage.getItem('feedback-form-state');
if (savedFormData) {
  const formData = JSON.parse(savedFormData);
  nameInput.value = formData.name;
  phoneInput.value = formData.phone;
  emailInput.value = formData.email;
  messageInput.value = formData.message;
}

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.removeItem('feedback-form-state');

  nameInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';
  messageInput.value = '';

  console.log(formData);
});

console.log(openModalBtn);
