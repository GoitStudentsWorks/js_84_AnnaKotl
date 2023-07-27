import svg from '../images/heart-defs.svg';

// const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

// class JSONPlaceholderAPI {
//   fetchRecipes() {
//     return fetch(`${BASE_URL}/recipes?limit=12&page=1`).then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });
//   }
// }
const favoriteStorige = JSON.parse(localStorage.getItem('favorites')) ?? [];
const favoriteRecipesList = document.querySelector('.favorite-recipes-list');
const favoriteFilterList = document.querySelector('.favorite-filter-list');
const blockFavorit = document.querySelector('.block-favorit');

// const jsonplaceholderInstance = new JSONPlaceholderAPI();

// jsonplaceholderInstance
//   .fetchRecipes()
//   .then(data => {
//     arrayRecipesFilter = data.results;

//     const renderCardsFilter = createMarkup(arrayRecipesFilter);
//     const renderFilter = createFilterMarkup(arrayRecipesFilter);

//     favoriteFilterList.insertAdjacentHTML('afterbegin', renderFilter);
//     favoriteRecipesList.insertAdjacentHTML('beforeend', renderCardsFilter);

//     if (renderCardsFilter) {
//       blockFavorit.classList.add('hidden');
//     } else favoriteFilterList.classList.add('hidden');

//     favoriteFilterList.addEventListener('click', onFilterClick);
//   })

//   .catch(err => {
//     console.warn(err);
//   });

const renderCardsFilter = createMarkup(favoriteStorige);
const renderFilter = createFilterMarkup(favoriteStorige);

favoriteFilterList.insertAdjacentHTML('beforeend', renderFilter);
favoriteRecipesList.insertAdjacentHTML('beforeend', renderCardsFilter);

// favoriteFilterList.innerHTML = createFilterMarkup(favoriteStorige);
// favoriteRecipesList.innerHTML = createMarkup(favoriteStorige);

if (renderCardsFilter) {
  blockFavorit.classList.add('hidden');
} else favoriteFilterList.classList.add('hidden');

favoriteFilterList.addEventListener('click', onFilterClick);

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
    <p class="instr-favor">(${instructions}).slice(0, 50)</p>
  </div>
  <div class="rating-panel-favorite">
    <div class="rating"></div>
    <button type="button" class="recipe-btn btn">See recipe</button>
  </div>
    <button class="heart-button" type="button">
  <svg class="heart-button-icon" width="20" height="20">
  <use href="${svg}#heart">
  </use>
  </svg>
  </button>
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
  // console.log(filterClass);

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
