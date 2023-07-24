const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

class JSONPlaceholderAPI {
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

const jsonplaceholderInstance = new JSONPlaceholderAPI();

jsonplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipes = data.results;

    const renderCards = createMarkup(arrayRecipes);

    recipesList.insertAdjacentHTML('beforeend', renderCards);
  })
  .catch(err => {
    console.warn(err);
  });

function createMarkup(arr) {
  return arr
    .map(({ title, category, preview, tags, instructions }) => {
      return `<li class="cards ${category}">
  <div class="recipe-img">
    <img class="images" src="${preview}" alt="${tags}" />
  </div>

  <div class="recipe-desc">
    <h1 class="title-favor">Title: ${title}</h1>
    <h2 class="${category} hidden">category: ${category}</h2>
    <p class="instructions">(${instructions}).slice(0, 50)</p>
  </div>
  <div class="rating-btn">
    <div class="rating"></div>
    <button type="button" class="recipe-btn btn">See recipe</button>
  </div>
</li>`;
    })
    .join('');
}
