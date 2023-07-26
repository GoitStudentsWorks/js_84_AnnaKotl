// import Pagination from 'tui-pagination';
// // import { createMarkup } from './filter-of-favourite-foods';

// function getPagination({ page, perPage, totalPages }) {
//     const container = document.getElementById('tui-pagination-container');
//     const options = {
//         totalItems: totalPages * perPage,
//         itemsPerPage: perPage,
//         visiblePages: 3,
//         page: +page,
//         centerAlign: false,
//         firstItemClassName: 'tui-first-child',
//         lastItemClassName: 'tui-last-child',
//         template: {
//             page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//             currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//             moveButton:
//                 '<a href="#" class="tui-page-btn tui-{{type}}">' +
//                     '<span class="tui-ico-{{type}}">{{type}}</span>' +
//                 '</a>',
//             disabledMoveButton:
//                 '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//                     '<span class="tui-ico-{{type}}">{{type}}</span>' +
//                 '</span>',
//             moreButton:
//                 '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//                     '<span class="tui-ico-ellip">...</span>' +
//                 '</a>'
//         }
//     };
//     const pagination = new Pagination(container, options);

//     pagination.on('afterMove', (event) => {
//         getRecipes(event.page);
//    });
// }

// async function getRecipes(page = 1) {
//     fetch('https://tasty-treats-backend.p.goit.global/api/recipes?'+ new URLSearchParams({
//         page
//     })).then((response) => response.json()).then((data) => {
//         getPagination(data);

//         const recipesMarkup = createMarkup(data.results);

//         const recipesContainer = document.querySelector('.recipes-list');

//         recipesContainer.innerHTML = recipesMarkup;
//     });
// };

// getRecipes();


