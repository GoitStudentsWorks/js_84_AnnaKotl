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

console.log(openModalBtn);
