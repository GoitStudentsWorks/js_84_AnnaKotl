const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
import { showModalAboutReciepts } from './video-recipe';

import svg from '../images/heart-defs.svg';

let page = 1;
let limit = 9;

class RecipesPlaceholderAPI {
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

// console.log(cards);

recipesplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipes = data.results;
    // console.log([...arrayRecipes]);

    const renderCards = createMarkup(arrayRecipes);

    recipesList.insertAdjacentHTML('beforeend', renderCards);
    // recipesList.innerHTML = createMarkup(arrayRecipes);
    const heartButton = document.querySelector('.heart-button');
    const cardsOfRecipe = document.querySelectorAll('.cards');
    heartButton.addEventListener('click', onHeartButtonClick);
    console.log(cardsOfRecipe[3]);
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
        return `<li class="cards ${category}" id="${_id}">

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
    <div class="rating"></div>
    <button type="button" class="see-recipe-btn btn" id="${_id}">See recipe</button>
  </div>
  
  <button class="heart-button" type="button">
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

const recipeButtons = document.querySelectorAll('.see-recipe-btn');
recipeButtons.forEach(button => {
  button.addEventListener('click', event => {
    const clickedRecipeElement = event.currentTarget.id;
    showModalAboutReciepts(clickedRecipeElement);
  });
});

function onHeartButtonClick(evt) {
  // if (evt.target.tagName !== 'BUTTON') return;
  let currentBtn = evt.target;
  console.dir(currentBtn);
  // currentBtn.classList.toggle('active');
  if (!currentBtn.classList.contains('active')) {
    currentBtn.classList.toggle('active');
  }

  // const storage = JSON.parse(localStorage.getItem('favorites')) || [];
  // if (currentBtn.classList.contains('active')) {
  //   localStorage.setItem('favorites', JSON.stringify(arrayRecipes));
  // } else {
  //   localStorage.setItem(
  //     'favorites',
  //     JSON.stringify([...arrayRecipes.filter(el => el.id !== currentBtn._id)])
  //   );
  // }
}

// const storage = localStorage.getItem('favorites');
// const data = JSON.parse(storage);
// if (storage && data.find(el => el.id === id)) {
//   return 'active';
// }
//   const recipeInfo = JSON.parse(currentBtn.dataset.info);
//   currentBtn.classList.toggle('active');
//   const storage = JSON.parse(localStorage.getItem('favorites')) ?? [];
//
