import svg from '../images/heart-defs.svg';
import { showModalAboutReciepts } from './video-recipe';

const favoriteStorige = JSON.parse(localStorage.getItem('favorites')) ?? [];
const favoriteRecipesList = document.querySelector('.favorite-recipes-list');
const favoriteFilterList = document.querySelector('.favorite-filter-list');
const blockFavorit = document.querySelector('.block-favorit');
const recipeFavButtons = document.querySelectorAll('.recipe-btn');
const heartFavButtons = document.querySelectorAll('.heart-fav-button');

const renderCardsFilter = createMarkup(favoriteStorige);
const renderFilter = createFilterMarkup(favoriteStorige);

favoriteFilterList.insertAdjacentHTML('beforeend', renderFilter);
favoriteRecipesList.insertAdjacentHTML('beforeend', renderCardsFilter);

if (renderCardsFilter) {
  blockFavorit.classList.add('hidden');
} else favoriteFilterList.classList.add('hidden');

function createMarkup(arr) {
  return arr
    .map(({ _id, title, category, rating, preview, tags, instructions }) => {
      return `<li class="cards-favorite ${category}" data-id="${_id}">

  <div class="favorite-recipe-img">
    <img class="images" src="${preview}" alt="${tags}" />
  </div>
    
  <div class="recipe-favorite-desc">
    <h2 class="title-favor">${title}</h2>
    <h3 class="${category} hidden"></h3>
    <p class="instr-favor">${instructions.slice(0, 65) + '...'}</p>
  </div>

  <div class="rating-panel-favorite">
    <div class="raitingAllFoods">${rating}</div>
    <div class="rating_blackAllFoods">
      <div class="rating__activeAllFoods"></div>
    </div>
    <button type="button" class="recipe-btn btn" id="${_id}">See recipe</button>
  </div>
  
  <button class="heart-fav-button" type="button" >
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
      <button type="button" class="ff-btn btn">${category}</button>
    </li>`;
    })
    .filter((category, index, array) => array.indexOf(category) === index)
    .join('');
}

export function onFilterClick(evt) {
  if (evt.target.tagName !== 'BUTTON') return;
  let filterClass = evt.target.textContent;
  //console.log(filterClass);
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

function initRating() {
  const ratingValue = parseFloat(
    document.querySelector('.raitingAllFoods').textContent
  );
  const ratingActive = document.querySelector('.rating__activeAllFoods');
  const percentageOfStars = ratingValue * 20 + '%';

  ratingActive.style.setProperty('width', percentageOfStars);
}

function onFavSeeBtnClick(evt) {
  evt.preventDefault();
  const clickedRecipeElement = evt.currentTarget.id;
  showModalAboutReciepts(clickedRecipeElement);
}

favoriteFilterList.addEventListener('click', onFilterClick);

//recipeFavButtons.forEach(button => {
//  button.addEventListener('click', onFavSeeBtnClick);
//});

//heartFavButtons.forEach(button => {
//  button.addEventListener('click', onHeartFavButtonClick);
//});

//function onHeartFavButtonClick(evt) {
//  evt.preventDefault();
//  const currentBtn = evt.currentTarget;
//  const card = findRecipe(currentBtn);
//  console.log(currentBtn);
//  currentBtn.classList.add('active');

//  if (currentBtn.classList.contains('active')) {
//    currentBtn.classList.remove('active');
//    const recipeIndex = favoriteArr.findIndex(({ _id }) => _id === card._id);
//    console.log(recipeIndex);
//    favoriteArr.splice(recipeIndex, 1);
//    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
//  }
//}
