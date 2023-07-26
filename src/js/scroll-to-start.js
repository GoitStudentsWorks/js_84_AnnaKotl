const scrollButton = document.getElementById('scroll-up-button');

scrollButton.style.display = 'none';

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.onscroll = function () {
  if (
    document.body.scrollTop > 700 ||
    document.documentElement.scrollTop > 700
  ) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
};

scrollButton.addEventListener('click', scrollToTop);
