import svg from '../images/heart-defs.svg';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
// const SVG_URL = './images/heart-defs.svg';
class RecipesPlaceholderAPI {
  fetchRecipes() {
    return fetch(`${BASE_URL}/recipes?limit=3&page=1`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}

const recipesList = document.querySelector('.recipes-list');

const recipesplaceholderInstance = new RecipesPlaceholderAPI();

// console.log(recipesList);

recipesplaceholderInstance
  .fetchRecipes()
  .then(data => {
    arrayRecipes = data.results;
    // console.log(arrayRecipes);

    const renderCards = createMarkup(arrayRecipes);
    // console.log(renderCards);
    recipesList.insertAdjacentHTML('beforeend', renderCards);
    // recipesList.innerHTML = createMarkup(arrayRecipes);
    const heartButton = document.querySelector('.heart-button');
    heartButton.addEventListener('click', onHeartButtonClick);
    console.log(heartButton);
  })
  .catch(err => {
    console.warn(err);
  });

export function createMarkup(arr) {
  return arr
    .map(
      ({
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
    <h2 class="title-recipe">Title: ${title}</h2>
    <h3 class="${category} hidden">category: ${category}</h3>
    <p class="instr-recipe">(${instructions})</p>
    <p class="area hidden">(${area})</p>
    <p class="time hidden">(${time})</p>
    <p class="ingredients hidden">(${ingredients})</p>
  </div>

  <div class="rating-panel">
    <div class="rating"></div>
    <button type="button" class="see-recipe-btn btn">See recipe</button>
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

function onHeartButtonClick(evt) {
  console.log(evt.target);
}

// function checkOnFavor(id) {
//   const storage = localStorage.getItem('favorites');
//   const data = JSON.parse(storage);
//   if (storage && data.find(el => el.id === id)) {
//     return 'active';
//   }
//   return '';
// }
// function toggleFavriteRecipe(currentBtn) {
//   const recipeInfo = JSON.parse(currentBtn.dataset.info);
//   currentBtn.classList.toggle('active');
//   const storage = JSON.parse(localStorage.getItem('favorites')) ?? [];
//   if (currentBtn.classList.contains('active')) {
//     localStorage.setItem('favorites', JSON.stringify([...storage, recipeInfo]));
//   } else {
//     localStorage.setItem(
//       'favorites',
//       JSON.stringify([...storage.filter(el => el.id !== recipeInfo.id)])
//     );
//   }
// }
