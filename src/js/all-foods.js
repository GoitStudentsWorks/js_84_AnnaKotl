const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
import { showModalAboutReciepts } from './video-recipe';
import svg from '../images/heart-defs.svg';
import { stringify } from 'querystring';

let page = 1;
let limit = 9;

class RecipesPlaceholderAPI {
  // page = 1;
  // limit = 9;
  async fetchRecipes() {
    return await fetch(`${BASE_URL}/recipes?limit=${limit}&page=${page}`).then(
      response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }
}

const recipesList = document.querySelector('.recipes-list');

const recipesplaceholderInstance = new RecipesPlaceholderAPI();
const maxLength = 65;
let arrayRecipes = {};
export const favoriteArr = JSON.parse(localStorage.getItem('favorites')) ?? [];

recipesplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipes = data.results;
    initRating();
    const renderCards = createMarkup(arrayRecipes);

    recipesList.insertAdjacentHTML('beforeend', renderCards);

    const heartButton = document.querySelectorAll('.heart-button');
    const recipeButtons = document.querySelectorAll('.see-recipe-btn');

    recipeButtons.forEach(button => {
      button.addEventListener('click', onSeeBtnClick);
    });

    heartButton.forEach(button => {
      button.addEventListener('click', onHeartButtonClick);
    });
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
        rating,
        preview,
        tags,
        instructions,
        area,
        time,
        ingredients,
      }) => {
        return `<li class="cards ${category}" data-id="${_id}">

  <div class="recipe-img">
    <img class="images" src="${preview}" alt="${tags}" />
  </div>
    
  <div class="recipe-desc">
    <h2 class="title-recipe">${title}</h2>
    <h3 class="${category} hidden"></h3>
    <p class="instr-recipe">${instructions.slice(0, maxLength) + '...'}</p>
    <p class="${area} hidden"></p>
    <p class="${time} hidden"></p>
    <p class="(${ingredients
      .map(({ measure }) => measure)
      .join(', ')}) hidden"></p>
  </div>

  <div class="rating-panel">
    <div class="raitingAllFoods">${rating}</div>
    <div class="rating_blackAllFoods">
      <div class="rating__activeAllFoods"></div>
    </div>
    <button type="button" class="see-recipe-btn btn" id="${_id}">See recipe</button>
  </div>
  
  <button class="heart-button" type="button" >
  <svg class="heart-button-icon" width="20" height="20">
  <use href="${svg}#heart">
  </use>
  </svg>
  </button>

</li>`;
      }
    )
    .join('');
}

function onSeeBtnClick(evt) {
  evt.preventDefault();
  const clickedRecipeElement = evt.currentTarget.id;
  showModalAboutReciepts(clickedRecipeElement);
}

function initRating() {
  const ratingValueElements = document.querySelectorAll('.raitingAllFoods');
  ratingValueElements.forEach(ratingElem => {
    const ratingValue = parseFloat(ratingElem.textContent);
    const ratingActive = ratingElem.nextElementSibling.querySelector(
      '.rating__activeAllFoods'
    );
    const percentageOfStars = ratingValue * 20 + '%';
    ratingActive.style.setProperty('width', percentageOfStars);
  });
}

export function onHeartButtonClick(evt) {
  evt.preventDefault();
  const currentBtn = evt.currentTarget;
  const card = findRecipe(currentBtn);
  currentBtn.classList.toggle('active');

  if (currentBtn.classList.contains('active')) {
    favoriteArr.push(card);
    localStorage.setItem('favorites', JSON.stringify(favoriteArr));

    const inStorage = favoriteArr.some(({ _id }) => _id === card._id);
    if (inStorage) {
      return;
    }
  } else {
    currentBtn.classList.remove('active');
    const recipeIndex = favoriteArr.findIndex(({ _id }) => _id === card._id);

    //console.log(recipeIndex);
    favoriteArr.splice(recipeIndex, 1);
    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
  }
}

//export function addToFavorites(id) {
//  // Accept the id as a parameter
//  if (id) {
//    const inStorage = favoriteArr.some(({ _id }) => _id === id);
//    if (inStorage) {
//      return;
//    }

//    const recipe = arrayRecipes.find(({ _id }) => _id === id);
//    console.log(recipe);
//    favoriteArr.push(recipe);
//    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
//  }
//}

function findRecipe(elem) {
  const cardId = elem.closest('.cards').dataset.id;
  return arrayRecipes.find(({ _id }) => _id === cardId);
}
