(() =>{
    const refs = {
        openModalbtn: document.querySelector('[data-modal-open-video-recipes]'),
        closeModalbtn: document.querySelector('[data-modal-close-video-recipes]'),
        modal: document.querySelector('[modal-video-recipes]')
    }

    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.openSecondModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);

    function toggleModal(){
        refs.modal.classList.toggle('is-hidden')
    }
})
const modalVideoRecipes = document.querySelector('.modal-video-recipes')

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
</iframe>`
    })
}