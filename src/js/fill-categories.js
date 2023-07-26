import { fetchCategories } from '../js/api-kay-js-files/api-scroll-categories';
import TemplateCategories from '../templates/categories.hbs';
import { Notify } from 'notiflix';


const refs = {
  categoryList: document.querySelector('.category-list'),
};


// async function fillCategoriesList() {
//   try {
//     const categories = await fetchCategories();
//     renderCategoriesList(categories);
//   } catch (err) {
//     console.log(err);
//     Notify.failure('Something went wrong. Please try again');
//   }
// };


// fillCategoriesList();


// function renderCategoriesList(categories) {
//   refs.categoryList.insertAdjacentHTML(
//     'beforeend',
//     TemplateCategories(categories)
//   );
// };


async function renderCategoriesList() {
  try { 
    const arrMk = await  fetchCategories();
    // console.log(arrMk);
    const markup = arrMk
    .map(evt => {
      return `<li class='cat-items'>
      <button class='category-btn' value = ${evt._id}>${evt.name}</button>
    </li>`}).join('');
  refs.categoryList.innerHTML = markup;
} catch (error) {
  console.error("Error:", error);
  Notify.failure('Something went wrong. Please try again');
}

}

renderCategoriesList();