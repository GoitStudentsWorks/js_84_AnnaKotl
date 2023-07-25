const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
import { showModalAboutReciepts } from "./video-recipe";

class RecipesPlaceholderAPI {
  fetchRecipes() {
    return fetch(`${BASE_URL}/recipes?limit=9&page=1`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}

const recipesList = document.querySelector('.recipes-list');

const recipesplaceholderInstance = new RecipesPlaceholderAPI();

console.log(recipesList);

recipesplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipes = data.results;
    console.log(arrayRecipes);

    const renderCards = createMarkup(arrayRecipes);
    console.log(renderCards);
    recipesList.insertAdjacentHTML('beforeend', renderCards);
    // recipesList.innerHTML = createMarkup(arrayRecipes);
  })
  .catch(err => {
    console.warn(err);
  });

export function createMarkup(arr) {
  return arr
    .map(
      ({
        _id,
        title,
        category,
        preview,
        tags,
        instructions,
        area,
        time,
        ingredients,
      }) => {
        return `<li class="cards ${category}">
  <div class="recipe-img">
    <img class="images" src="${preview}" alt="${tags}" />
  </div>
  <div class="recipe-desc">
    <h2 class="title-recipe">${title}</h2>
    <h3 class="${category} hidden">category: ${category}</h3>
    <p class="instructions">(${instructions})</p>
    <p class="area hidden">(${area})</p>
    <p class="time hidden">(${time})</p>
    <p class="ingredients hidden">(${ingredients})</p>
  </div>
  <div class="rating-panel">
    <div class="rating"></div>
    <button type="button" class="see-recipe-btn btn" id="${_id}">See recipe</button>
  </div>
</li>`;
      }
    )
    .join('');
}

const recipeButtons = document.querySelectorAll('.see-recipe-btn');
recipeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const clickedRecipeElement = event.currentTarget.id;
    showModalAboutReciepts(clickedRecipeElement);
  });
});