const openModalBtn = document.getElementById('openModalOrderNowBtn');
const closeModalBtn = document.getElementById('closeModalOrderNowBtn');
const modal = document.getElementById('modalordernow');

function openModalOrderNow() {
  modal.style.display = 'block';
}

function closeModalOrderNow() {
  modal.style.display = 'none';
}

openModalOrderNowBtn.addEventListener('click', openModalOrderNow);
closeModalOrderNowBtn.addEventListener('click', closeModalOrderNow);
