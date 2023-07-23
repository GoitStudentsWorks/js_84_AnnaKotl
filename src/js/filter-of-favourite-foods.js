const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

class JSONPlaceholderAPI {
  fetchRecipes() {
    return fetch(`${BASE_URL}/recipes?limit=12&page=2`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}

const recipesList = document.querySelector('.recipes-list');
const filterList = document.querySelector('.favorite-filter-list');
const filterItem = document.querySelector('.filter-item');
let recipeElements = '';

const jsonplaceholderInstance = new JSONPlaceholderAPI();

jsonplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipes = data.results;
    arrayRecipes.forEach(element => {
      recipeElements = element.instructions.slice(0, 50).trim();
      console.log(recipeElements);
    });
    const renderCards = createMarkup(arrayRecipes);
    const renderFilter = createFilterMarkup(arrayRecipes);
    filterList.insertAdjacentHTML('beforeend', renderFilter);
    recipesList.insertAdjacentHTML('beforeend', renderCards);
  })
  .catch(err => {
    console.warn(err);
  });

function createMarkup(arr) {
  return arr
    .map(({ title, category, preview, tags, instructions }) => {
      return `<li class="cards ${category}">
  <img src="${preview}" alt="${tags}" />
  <div class="recipe-desc">
    <h1>Title: ${title}</h1>
    <h2 class="${category}">category: ${category}</h2>
    <p></p>
  </div>
</li>`;
    })
    .join('');
}

function createFilterMarkup(arr) {
  return arr
    .map(({ category }) => {
      return `<li class="filter-item">
      <button type="button" class="filter-btn btn">${category}</button>
    </li>`;
    })
    .filter((category, index, array) => array.indexOf(category) === index)
    .join('');
}
filterList.addEventListener('click', onFilterClick);

function onFilterClick(evt) {
  if (evt.target.tagName !== 'BUTTON') return;

  let filterClass = evt.target.textContent;
  console.log(filterClass);

  let allCards = [...document.getElementsByClassName('cards')];
  console.log(allCards);

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
