//-----------------------------------------
// закоментувала все бо помилки в консолі:
// ЗРОБИТИ ПУШ ПІСЛЯ ВИПРАВЛЕНЬ І БЕЗ ПОМИЛОК
//-----------------------------------------

import { showModalAboutReciepts } from './video-recipe';


const url = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

const pop_recipe_info = document.querySelector('.popular-recipes');

function fetchPopularRecipes() {
  return fetch(`${url}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

fetchPopularRecipes()
  .then(data => {
    console.log(data);
    //pop_recipe_info.insertAdjacentHTML('beforeend', renderPopularRecipes(data));
    pop_recipe_info.innerHTML = renderPopularRecipes(data);
  })
  .catch(error => {
    console.log(error);
  });

function renderPopularRecipes(recipes) {
  return recipes
    .map(({ _id, preview, title, description }) => {
      return `<li class="pop-recipe-link" id="${_id}">
      <div class="pop-recipe-card">
    <img class="img-pop-recipe" src="${preview}" width="64" height="64" alt="">
    <div class="text-pop-recipe">
    <h3 class="title-pop-recipe">${title}</h3>
    <p class="description-pop-recipe">${description}</p>
    </div>
    </div>
  </li>`;
    })
    .join('');
}

// // тут може бути помилка:

//showModalAboutReciepts('6462a8f74c3d0ddd28898040');
// // const openResipesCards = document.querySelectorAll('li');


document.getElementById('popularRecipeList').addEventListener('click', (event) => {
  const clickedRecipeElement = event.target.closest('.pop-recipe-link');
  if (clickedRecipeElement) {
    const recipeId = clickedRecipeElement.id;
    showModalAboutReciepts(recipeId);
  }
});