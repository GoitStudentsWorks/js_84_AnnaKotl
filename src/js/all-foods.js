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
const favoriteArr = JSON.parse(localStorage.getItem('favorites')) ?? [];

recipesplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipes = data.results;
  filter-of-favorite-foods


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

    function onHeartButtonClick(evt) {
      evt.preventDefault();
      const currentBtn = evt.currentTarget;

      if (currentBtn.classList.contains('active')) {
        currentBtn.classList.remove('active');
      } else {
        currentBtn.classList.toggle('active');
      }
      if (currentBtn.classList.contains('heart-button')) {
        const card = findRecipe(currentBtn);
        const inStorage = favoriteArr.some(({ _id }) => _id === card._id);
        if (inStorage) {
          return;
        }

        favoriteArr.push(card);
        localStorage.setItem('favorites', JSON.stringify(favoriteArr));
      }
    }

    function findRecipe(elem) {
      const cardId = elem.closest('.cards').dataset.id;
      return arrayRecipes.find(({ _id }) => _id === cardId);
    }
    function initRating() {
      const ratingValue = parseFloat(
        document.querySelector('.raitingAllFoods').textContent
      );
      const ratingActive = document.querySelector('.rating__activeAllFoods');
      const percentageOfStars = ratingValue * 20 + '%';

      ratingActive.style.setProperty('width', percentageOfStars);
    }
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

const recipeButtons = document.querySelectorAll('.recipe-btn');
recipeButtons.forEach(button => {
  button.addEventListener('click', event => {
    const clickedRecipeElement = event.currentTarget.id;
    showModalAboutReciepts(clickedRecipeElement);
  });
});

// const storage = localStorage.getItem('favorites');
// const data = JSON.parse(storage);
// if (storage && data.find(el => el.id === id)) {
//   return 'active';
// }
//   const recipeInfo = JSON.parse(currentBtn.dataset.info);
//   currentBtn.classList.toggle('active');
//   const storage = JSON.parse(localStorage.getItem('favorites')) ?? [];
//
