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
// console.log(cards);

recipesplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipes = data.results;
    console.log(arrayRecipes);

    const renderCards = createMarkup(arrayRecipes);

    recipesList.insertAdjacentHTML('beforeend', renderCards);

    const heartButton = document.querySelectorAll('.heart-button');
    const recipeButtons = document.querySelectorAll('.see-recipe-btn');

    // console.log(renderCards);
    // console.log(recipeButtons);

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
        console.log(favoriteArr.title);
        console.log(card._id);

        favoriteArr.push(card);
        localStorage.setItem('favorites', JSON.stringify(favoriteArr));
      }
    }

    function findRecipe(elem) {
      const cardId = elem.closest('.cards').dataset.id;
      // console.log(cardId);
      return arrayRecipes.find(({ _id }) => _id === cardId);
    }
    // function onHeartButtonClick(evt) {
    //   evt.preventDefault();
    //   const currentBtn = evt.currentTarget;
    //   // console.log(currentBtn.id);
    //   if (currentBtn.classList.contains('active')) {
    //     currentBtn.classList.remove('active');
    //   } else {
    //     currentBtn.classList.toggle('active');
    //     setToStorige();
    //   }

    //
    // }
  })
  .catch(err => {
    console.warn(err);
  });

// function setToStorige() {
//   const cardsOfRecipe = document.querySelectorAll('.cards');
//   const idCard = cardsOfRecipe.id;
//   console.log(...cardsOfRecipe);

//   localStorage.setItem('favorites', JSON.stringify(...cardsOfRecipe._id));
// }

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
    <div class="rating"></div>
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

// console.log([...cardsOfRecipe.filter(el => el.id === currentBtn.id)]);
// JSON.stringify(
//   [...arrayRecipes].filter(function (el) {
//     return el.id === currentBtn.id;
//   })
// );
// const storage = JSON.parse(localStorage.getItem('favorites')) || [];
// if (currentBtn.classList.contains('active')) {
//   localStorage.setItem('favorites', JSON.stringify(arrayRecipes));
// } else {
//   localStorage.setItem(
//     'favorites',
//     JSON.stringify([...arrayRecipes.filter(el => el.id !== currentBtn._id)])
//   );
// }

// const storage = localStorage.getItem('favorites');
// const data = JSON.parse(storage);
// if (storage && data.find(el => el.id === id)) {
//   return 'active';
// }
//   const recipeInfo = JSON.parse(currentBtn.dataset.info);
//   currentBtn.classList.toggle('active');
//   const storage = JSON.parse(localStorage.getItem('favorites')) ?? [];
//
