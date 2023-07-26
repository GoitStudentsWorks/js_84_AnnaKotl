import { fetchCategories } from '../js/api-kay-js-files/api-scroll-categories';
import TemplateCategories from '../templates/categories.hbs';
import { Notify } from 'notiflix';


const refs = {
  categroyList: document.querySelector('.category-list'),
};


async function fillCategoryList() {
  try {
    const categories = await fetchCategories();
    renderCategoryList(categories);
  } catch (err) {
    console.log(err);
    Notify.failure('Something went wrong. Please try again');
  }
};


fillCategoryList();


function renderCategoryList(categories) {
  refs.categroyList.insertAdjacentHTML(
    'beforeend',
    TemplateCategories(categories)
  );
};