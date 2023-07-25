const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

class JSONPlaceholderAPI {
  fetchRecipes() {
    return fetch(`${BASE_URL}/recipes?limit=12&page=1`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}

const favoriteRecipesList = document.querySelector('.favorite-recipes-list');
const favoriteFilterList = document.querySelector('.favorite-filter-list');
const blockFavorit = document.querySelector('.block-favorit');

const jsonplaceholderInstance = new JSONPlaceholderAPI();

jsonplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipesFilter = data.results;

    const renderCardsFilter = createMarkup(arrayRecipesFilter);
    const renderFilter = createFilterMarkup(arrayRecipesFilter);

    favoriteFilterList.insertAdjacentHTML('beforeend', renderFilter);
    favoriteRecipesList.insertAdjacentHTML('beforeend', renderCardsFilter);

    if (renderCardsFilter) {
      blockFavorit.classList.add('hidden');
    } else favoriteFilterList.classList.add('hidden');
  })
  .catch(err => {
    console.warn(err);
  });

function createMarkup(arr) {
  return arr
    .map(({ title, category, preview, tags, instructions }) => {
      return `<li class="cards-favorite ${category}">
  <div class="recipe-img">
    <img class="images" src="${preview}" alt="${tags}" />
  </div>

  <div class="recipe-favorite-desc">
    <h1 class="title-favor">Title: ${title}</h1>
    <h2 class="${category} hidden">category: ${category}</h2>
    <p class="instructions">(${instructions}).slice(0, 50)</p>
  </div>
  <div class="rating-panel-favorite">
    <div class="rating"></div>
    <button type="button" class="recipe-btn btn">See recipe</button>
  </div>
</li>`;
    })
    .join('');
}

function createFilterMarkup(arr) {
  return arr
    .map(({ category }) => {
      return `<li class="favorite-filter-item">
      <button type="button" class="filter-btn btn">${category}</button>
    </li>`;
    })
    .filter((category, index, array) => array.indexOf(category) === index)
    .join('');
}

function onFilterClick(evt) {
  if (evt.target.tagName !== 'BUTTON') return;

  let filterClass = evt.target.textContent;
  console.log(filterClass);

  let allCards = [...document.getElementsByClassName('cards-favorite')];
  // console.log(allCards);

  allCards.forEach(elem => {
    elem.classList.remove('hidden');
    if (
      !elem.classList.contains(filterClass) &&
      filterClass !== 'All categories'
    ) {
      elem.classList.add('hidden');
    }
  });
}

favoriteFilterList.addEventListener('click', onFilterClick);
console.log(favoriteFilterList);
