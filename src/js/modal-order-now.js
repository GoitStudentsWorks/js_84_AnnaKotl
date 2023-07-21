(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open-ordernow]'),
    openSecondModalBtn: document.querySelector(
      '[data-modal-open-ordernowsecond]'
    ),

    closeModalBtn: document.querySelector('[data-modal-close-ordernow]'),
    modal: document.querySelector('[data-modal-ordernow]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.openSecondModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();
console.log('modal-order-now.js work');
