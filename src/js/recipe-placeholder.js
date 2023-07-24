// import Pagination from 'tui-pagination';
import '../css/recipe-placeholder.css';
// import { showRecipes, getRecipesData } from './all-recipes';
async function getRecipesData(url = URL, params) {
  const { perPage, totalPages } = await getAllRecipes(url, params);



// // import Pagination from 'tui-pagination';
// import '../css/recipe-placeholder.css';
// // import { showRecipes, getRecipesData } from './all-recipes';
// async function getRecipesData(url = URL, params) {
//   const { perPage, totalPages } = await getAllRecipes(url, params);

//   return { perPage, totalPages };
// }
// async function showRecipes(url, params = {}) {
//   const recipes = await createRecipeList(url, params);
//   clearRecipeList();
//   recipeList.insertAdjacentHTML('beforeend', recipes);
//   markUpRating();
// }

// showRecipes(URL, { limit: limitCount });

// // Привязка обработчика смены страницы
// pagination.on('afterMove', onPageChange);
