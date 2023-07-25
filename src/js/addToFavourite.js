const iconHeart = document.querySelector('.heart-button-icon')
const buttonAddToFavourite = document.querySelector('#bnt-add')
const KEY = 'favCards'
buttonAddToFavourite.addEventListener('click', functionAddtoFavourite)
iconHeart.addEventListener('click', functionAddtoFavourite)

export function functionAddtoFavourite(data._id) {
    localStorage.setItem(favourites, data._id)
}

const takeFavourite = localStorage.getItem(favourites)
if(favourites) {

}