import { favoriteArr } from './all-foods';
import axios from 'axios';
import { omit } from 'lodash';

export let refs = {
  removeFromFavourite :document.querySelector('.btn-remove'),
  addToFavoriteBtn: document.querySelector('.btn-add'),
  recieptsTitle: document.querySelector('.reciepts-title'),
  backdropRecipe: document.querySelector('.backdrop-video-recipes'),
  modalRecipe: document.querySelector('.modal-video-recipe'),
  closeBtn: document.querySelector('.modal-video-recipes-close-button'),
  tagsRecipe: document.querySelector('.tags-recipe'),
  ratingRecipe: document.querySelector('.rating-recipe'),
  minutesRecipe: document.querySelector('.minutes-recipe'),
  ingredientsRecipe: document.querySelector('.ingredients-recipe'),
  instructionsRecipe: document.querySelector('.instructions-recipe'),
  videoRecipe: document.querySelector('.video-recipe'),
};

refs.closeBtn?.addEventListener('click', closeModalClose);
refs.backdropRecipe?.addEventListener('click', clickBackdropClick);

function openModalOpen() {
  setTimeout(() => {
    window.addEventListener('keydown', onEscPress);
    document.body.classList.add('overflowHidden');
    refs.backdropRecipe.classList.add('active');
    refs.modalRecipe.classList.add('active');

    const card = findRecipe(refs.addToFavoriteBtn);
    const inStorage = favoriteArr.some(({ _id }) => _id === card._id);
    if (inStorage) {
      refs.addToFavoriteBtn.classList.add('active');
      refs.addToFavoriteBtn.textContent = 'Remove from Favorite';
    } else {
      refs.addToFavoriteBtn.classList.remove('active');
      refs.addToFavoriteBtn.textContent = 'Add to Favorite';
    }
  }, 50);
}

function closeModalClose() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('overflowHidden');
  refs.backdropRecipe.classList.remove('active');
  refs.modalRecipe.classList.remove('active');
}

function onEscPress(key) {
  if (key.code === 'Escape') {
    closeModalClose();
  }
}
function clickBackdropClick(element) {
  if (element.currentTarget === element.target) closeModalClose();
}

export function showModalAboutReciepts(id) {
  recieptsOfFood(id).then(data => {
    isRecieptFavourite(data); 
    renderRanting(data);
    initRating();
    renderIngridient(data);
    renderHashtags(data);
    renderText(data);
    openModalOpen();
    renderVIDEO(data);
    recipeId = data._id;
  });
}

async function recieptsOfFood(id) {
  const resp = await fetch(
    `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
  );
  const data = await resp.json();
  return data;
}

function renderText(data) {
  refs.recieptsTitle.textContent = data.title;
  refs.videoRecipe.src = data.preview;
  refs.instructionsRecipe.textContent = data.instructions;
  refs.minutesRecipe.textContent = data.time + ' min';
}

function initRating() {
  const ratingValue = parseFloat(
    document.querySelector('.rating__value.detail').textContent
  );
  const ratingActive = document.querySelector('.rating__active');
  const percentageOfStars = ratingValue * 20 + '%';

  ratingActive.style.setProperty('width', percentageOfStars);
}

function getKeyYouTybe(url) {
  let indexLast = url.split('').length;
  let key = url.split('').splice(32, indexLast).join('');
  return key;
}
function renderVIDEO(data) {
  const markUp = `
   <iframe class="video-recipe-instruction"
                src="https://www.youtube.com/embed/${getKeyYouTybe(
                  data.youtube
                )}"
title = "YouTube video player"
frameborder = "0"
allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
  ></iframe >
`;
  refs.videoRecipe.innerHTML = markUp;
}

function renderRanting(data) {
  let markupR = `
    <div class="cards__rating rating">
    <div class="rating__value detail">${data.rating}</div>
    <div class="rating__body">
      <div class="rating__active"></div>
    </div>
  </div>`;
  refs.ratingRecipe.innerHTML = markupR; // Change refs.ratingBox to refs.ratingRecipe
}

function renderIngridient(data) {
  const markup = data.ingredients
    .map(
      ({ measure, name }) => `
        <li class="recipes-subtitle">
          ${name}
          <p class="recipes-inf">${measure}</p>
        </li>
      `
    )
    .join('');
  refs.ingredientsRecipe.innerHTML = markup; // Change refs.IngredientBox to refs.ingredientsRecipe
}

function renderHashtags(data) {
  if (data.tags.length === 0) {
    return;
  }
  const markup = data.tags
    .map(tag => ` <li class="hashtags">#${tag}</li>`)
    .join('');
  refs.tagsRecipe.innerHTML = markup; // Change refs.hashtagsBox to refs.tagsRecipe
}




function isRecieptFavourite(data) {
  if (localStorage.getItem('favorites').includes(data._id)) {
    refs.addToFavoriteBtn.classList.add('active');
    refs.addToFavoriteBtn.textContent = 'Remove from favorite';
    refs.addToFavoriteBtn.style.display = 'none';
    refs.removeFromFavourite.style.display = 'block';
  } else {
    refs.addToFavoriteBtn.classList.remove('active');
    refs.addToFavoriteBtn.textContent = 'Add to Favorite';
    refs.addToFavoriteBtn.style.display = 'block';
    refs.removeFromFavourite.style.display = 'none';
  }
}
function onFavouriteBtnClick() {
  const card = findRecipe(refs.addToFavoriteBtn); // Find the recipe associated with the button
  const inStorage = favoriteArr.some(({ _id }) => _id === card._id);
function funremoveFromFavourite(localStorageObj, id) {
  refs.addToFavoriteBtn.style.display = 'block';
  refs.removeFromFavourite.style.display = 'none';
  favRecipesObj = omit(localStorageObj, id);
  localctorage.save('favorites', favRecipesObj);
}
async function onFavouriteBtnClick(localStorageObj = {}, id) {
  const data = await getInfo(id);
 refs.addToFavoriteBtn.style.display = 'none';
    refs.removeFromFavourite.style.display = 'block';
  localStorageObj[id] = data;
  localctorage.save('favorites', localStorageObj);

  return localStorageObj;
}

  if (!inStorage) {
    // If the recipe is not in favorites, add it
    favoriteArr.push(card);
    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
    refs.addToFavoriteBtn.classList.add('active');
    refs.addToFavoriteBtn.textContent = 'Remove from Favorite';
  } else {
    // If the recipe is already in favorites, remove it
    favoriteArr = favoriteArr.filter(({ _id }) => _id !== card._id);
    localStorage.setItem('favorites', JSON.stringify(favoriteArr));
    refs.addToFavoriteBtn.classList.remove('active');
    refs.addToFavoriteBtn.textContent = 'Add to Favorite';
  }
async function getInfo(id) {
  const response = await axios.get(
    `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
  );

  return response.data;
}


refs.addToFavoriteBtn.addEventListener('click', onFavouriteBtnClick);
refs.removeFromFavourite.addEventListener('click', funremoveFromFavourite);


// function isRecieptFavourite(data) {
//   if (localStorage.getItem('favorites').includes(data._id)) {
//     refs.addToFavoriteBtn.classList.add('active');
//     refs.addToFavoriteBtn.textContent = 'Remove from favorite';
//   } else {
//     refs.addToFavoriteBtn.classList.remove('active');
//     refs.addToFavoriteBtn.textContent = 'Add to Favorite';
//   }
// }
// function onFavouriteBtnClick() {
//   const card = findRecipe(refs.addToFavoriteBtn); // Find the recipe associated with the button
//   const inStorage = favoriteArr.some(({ _id }) => _id === card._id);

//   if (!inStorage) {
//     // If the recipe is not in favorites, add it
//     favoriteArr.push(card);
//     localStorage.setItem('favorites', JSON.stringify(favoriteArr));
//     refs.addToFavoriteBtn.classList.add('active');
//     refs.addToFavoriteBtn.textContent = 'Remove from Favorite';
//   } else {
//     // If the recipe is already in favorites, remove it
//     favoriteArr = favoriteArr.filter(({ _id }) => _id !== card._id);
//     localStorage.setItem('favorites', JSON.stringify(favoriteArr));
//     refs.addToFavoriteBtn.classList.remove('active');
//     refs.addToFavoriteBtn.textContent = 'Add to Favorite';
//   }
// }

// refs.addToFavoriteBtn.addEventListener('click', onFavouriteBtnClick);





// function onFavouriteBtnClick() {
//   refs.addToFavoriteBtn.classList.toggle('active'); // Toggle the active class on the button

//   const card = findRecipe(refs.addToFavoriteBtn); // Find the recipe associated with the button
//   const inStorage = favoriteArr.some(({ _id }) => _id === card._id);

//   if (refs.addToFavoriteBtn.classList.contains('active')) {
//     // If the button is being added to favorites
//     if (!inStorage) {
//       favoriteArr.push(card); // Add the recipe to favoriteArr
//       localStorage.setItem('favorites', JSON.stringify(favoriteArr)); // Update localStorage
//     }
//   } else {
//     // If the button is being removed from favorites
//     if (inStorage) {
//       favoriteArr = favoriteArr.filter(({ _id }) => _id !== card._id); // Remove the recipe from favoriteArr
//       localStorage.setItem('favorites', JSON.stringify(favoriteArr)); // Update localStorage
//     }
//   }
// }


// refs.addToFavoriteBtn.addEventListener('click', onFavouriteBtnClick);
