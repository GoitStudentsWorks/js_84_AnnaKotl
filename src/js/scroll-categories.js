import { fetchCategories } from '../js/api-kay-js-files/api-scroll-categories';

const categoriesContainer = document.querySelector('.category-container');
const allCategoryBtn = document.querySelector('.all-category-button');
const categories = document.querySelector('.category-list');

const createCategoryButtons = async () => {
  const categoryListEl = document.querySelector('.category-list');

  const categories = await fetchCategories();

  const markup = categories.map(({ name }) => `
              <li class="categories-item">
                <button class="category-btn" type="button">
                  ${name}
                </button>
              </li>`).join('');
  
  categoryListEl.insertAdjacentHTML('beforeend', markup);
}
createCategoryButtons();

let lastClickedBtn = null;
categoriesContainer.addEventListener('click', (e) => {
  const Btn = e.target;
  if (Btn.nodeName !== 'BUTTON') {
    return;
  }
  if (lastClickedBtn) {
    lastClickedBtn.classList.remove('active');
  }
  if (Btn === allCategoryBtn) {
    removeActive();
  } else {
    allCategoryBtn.classList.remove('active');
  }
  Btn.classList.add('active');
  lastClickedBtn = Btn;
});
const removeActive = () => {
  const buttons = categories.querySelectorAll('button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
}