(() => {
    const refs = {
      openModalBtn: document.querySelector('[data-modal-open-reciepts]'),
      closeModalBtn: document.querySelector('[data-modal-close-reciepts]'),
      modal: document.querySelector('[data-modal-reciepts]'),
    };
  
    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle('is-hidden');
    }
  })();
// import axios from "axios";

let refs = {
recieptsTitle: document.querySelector('.reciepts-title'),
tagsRecipe: document.querySelector('.tags-recipe'),
ratingRecipe: document.querySelector('.rating-recipe'),
minutesRecipe: document.querySelector('.minutes-recipe'),
ingredientsRecipe: document.querySelector('.ingredients-recipe'),
instructionsRecipe: document.querySelector('.instructions-recipe'),
videoRecipe: document.querySelector('.video-recipe'),
buttonsAdd: document.querySelector('.buttons-add')
}

export function finallInitPage(id) {
    recieptsOfFood(id).then(data => {
    //   isFavorite(data._id);
      renderVIDEO(data);
      renderRanting(data);
    //   markUpRating();
      renderIngridient(data);
      renderHashtags(data);
      renderText(data);
    //   openModalOpen();
      recipeId = data._id;
    });
}

async function recieptsOfFood(id){
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

function renderVIDEO(data) {
    const markUp = `
      <iframe
        width="100%"
        height="100%"
        src="${data.youtube}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
    refs.videoRecipe.innerHTML = markUp; // Change refs.tiezer to refs.videoRecipe
  }
  
  function renderRanting(data) {
    let markupR = `
    <div class="cards__rating rating">
    <div class="rating__value detail">${data.rating}</div>
    <div class="rating__body">
      <div class="rating__active"></div>
      <div class="rating__items">
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="1"
        />
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="2"
        />
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="3"
        />
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="4"
        />
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="5"
        />
      </div>
    </div>
  </div>`;
    refs.ratingRecipe.innerHTML = markupR; // Change refs.ratingBox to refs.ratingRecipe
  }
  
  function renderIngridient(data) {
    const markup = data.ingredients
      .map(({ measure, name }) => `
        <li class="recipes-subtitle">
          ${name}
          <p class="recipes-inf">${measure}</p>
        </li>
      `)
      .join('');
    refs.ingredientsRecipe.innerHTML = markup; // Change refs.IngredientBox to refs.ingredientsRecipe
  }
  
  function renderHashtags(data) {
    if (data.tags.length === 0) {
      return;
    }
    const markup = data.tags.map(tag => ` <li class="hashtags">#${tag}</li>`).join('');
    refs.tagsRecipe.innerHTML = markup; // Change refs.hashtagsBox to refs.tagsRecipe
  }

  finallInitPage('6467fb9d3d8125271a59219e')