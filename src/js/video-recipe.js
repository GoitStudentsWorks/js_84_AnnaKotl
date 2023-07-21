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

const modalVideoRecipes = document.querySelector('.video-recipe')

function showRecieptInfo(info){
    const modalVideoRecipesMarkup = info.map(({
        title,
        youtube,
        tags,
        ingredients,
        instructions,
        time,
        rating,
    }) => {
        return `<h2 class="title">${title}</h2>
        <iframe width="467" height="250"
src=${youtube}>
</iframe>
<p class="tags">#${tags}</p>
<p>${rating}</p>
<svg class="reciepts-stars1" width="18" height="18">
        <use href="/src/images/icons-modal-reciepts.svg#icon-Star--converted"></use>
    </svg>
    <svg class="reciepts-stars2" width="18" height="18">
        <use href="/src/images/icons-modal-reciepts.svg#icon-Star--converted"></use>
    </svg>
    <svg class="reciepts-stars3" width="18" height="18">
        <use href="/src/images/icons-modal-reciepts.svg#icon-Star--converted"></use>
    </svg>
    <svg class="reciepts-stars4" width="18" height="18">
        <use href="/src/images/icons-modal-reciepts.svg#icon-Star--converted"></use>
    </svg>
    <svg class="reciepts-stars5" width="18" height="18">
        <use href="/src/images/icons-modal-reciepts.svg#icon-Star--converted"></use>
</svg>
<p class="reciepts-time">${time} min</p>
<ul>
<li><p class="reciepts-name">${ingredients.name}</p><pclass="reciepts-measure">${ingredients.measure}</pclass=></li>
</ul>
<p class="reciepts-instructions">${instructions}</p>
<button class="add-to-favourite">Add to favorite</button>
<button class="give-a-rating">Give a rating</button>
`}).join('')
modalVideoRecipes.insertAdjacentHTML('beforeend', modalVideoRecipesMarkup)
}

function recieptsOfFood (){
    const BASE_URL_RECIEPTS = 'https://tasty-treats-backend.p.goit.global/api/recipes/6462a8f74c3d0ddd28897fd9'

    return fetch(BASE_URL_RECIEPTS)
    .then(resp => {
        if (!resp.ok) throw new Error(resp.status);
        return resp.json();
      })
      .catch(error  => console.log(error))
}