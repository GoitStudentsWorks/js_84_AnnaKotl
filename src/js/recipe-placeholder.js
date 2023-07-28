import Pagination from 'tui-pagination';
import { createMarkup } from './all-foods';

function getPagination({ page, perPage, totalPages }) {
  const container = document.getElementById('tui-pagination-container');
  const windowWidth = document.documentElement.clientWidth;
let  totalItems = 0;
let visiblePages = 0;
if (windowWidth < 768) {
  visiblePages = 2;
   totalItems = 6;
} else if (windowWidth > 768 && windowWidth < 1280) {
  visiblePages = 3;
 totalItems = 8;
} else if (windowWidth > 1280) {
  visiblePages = 3;
  totalItems = 9;
}


    const options = {
        totalItems: totalPages * perPage,
        itemsPerPage: perPage,
        visiblePages: 3,
        page: +page,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            moveButton:
                '<a href="#" class="tui-page-btn tui-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                    '<span class="tui-ico-ellip">...</span>' +
                '</a>'
        }
    };
    const pagination = new Pagination(container, options);

    pagination.on('afterMove', (event) => {
        getRecipes(event.page);
   });
}

async function getRecipes(page = 1) {
    fetch('https://tasty-treats-backend.p.goit.global/api/recipes?'+ new URLSearchParams({
        page
    })).then((response) => response.json()).then((data) => {
        getPagination(data);

        const recipesMarkup = createMarkup(data.results);

        const recipesContainer = document.querySelector('.recipes-list');

        recipesContainer.innerHTML = recipesMarkup;
    });
};

getRecipes();


// let visiblePages; // Declare the variable in the appropriate scope

// function mobPagination() {
//   const windowWidth = document.documentElement.clientWidth;

//   if (windowWidth < 768) {
//     visiblePages = 2;
//   } else {
//     visiblePages = 3;
//   }
// }

// Call the function to set the value of visiblePages
// mobPagination();

// const windowWidth = document.documentElement.clientWidth;
// let limitCount = 0;
// if (windowWidth < 768) {
//   limitCount = 6;
// } else if (windowWidth > 768 && windowWidth < 1280) {
//   limitCount = 8;
// } else if (windowWidth > 1280) {
//   limitCount = 9;
// }
