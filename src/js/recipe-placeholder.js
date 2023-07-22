import Pagination from 'tui-pagination';
import '../css/recipe-placeholder.css';
async function getRecipesData() {
    const showRecipes = await fetch('https://tasty-treats-backend.p.goit.global/api/recipes/popular');
    const data = await response.json();
    return data;
}

const URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
const container = document.getElementById('tui-pagination-container');
const windowWidth = document.documentElement.clientWidth;
let limitCount = 0;
if (windowWidth < 768) {
  limitCount = 6;
} else if (windowWidth > 768 && windowWidth < 1280) {
  limitCount = 8;
} else if (windowWidth > 1280) {
  limitCount = 9;
}

async function createPagination(url, params) {
  const { perPage, totalPages } = await getRecipesData(url, params);

  const options = {
    totalItems: perPage * totalPages,
    itemsPerPage: perPage,
    visiblePages: window.innerWidth < 768 ? 2 : 3,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="pag__page-btn tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="pag__current-page tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="pag__btn-move tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="pag__btn-move pag__btn-disabled tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const paginationP = new Pagination(container, options);

  paginationP.getCurrentPage();
  paginationP.on('afterMove', event => {
    const currentPage = event.page;
    showRecipes(url, { ...params, page: currentPage, limit: limitCount });
  });
}

export function showPagination(url, params = {}) {
  container.innerHTML = '';
  createPagination(url, { ...params, limit: limitCount });
}
showPagination(URL);

// function resizeVisPage() {
//   const screenWidth = window.innerWidth;

//   if (screenWidth < 768) {
//     return 2;
//   }

//   if (screenWidth >= 768) {
//     return 3;
//   }
// }

// function startPagination(page, perPage, totalPages, callback) {
//   const options = {
//     totalItems: Number(perPage) * Number(totalPages),
//     itemsPerPage: Number(perPage),
//     visiblePages: resizeVisPage(),
//     page: Number(page),
//     centerAlign: false,
//     omitMiddlePages: false,
//     firstItemClassName: 'tui-first-child',
//     lastItemClassName: 'tui-last-child',
//     template: {
//       page: '<a href="#" class="tui-page-btn pag-page">{{page}}</a>',
//       currentPage:
//         '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//       moveButton:
//         '<a href="#" class="tui-page-btn tui-{{type}} move-button">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</a>',
//       disabledMoveButton:
//         '<span class="tui-page-btn tui-is-disabled tui-{{type}} prev-button">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</span>',
//       moreButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip more-button">' +
//         '<span class="tui-ico-ellip">...</span>' +
//         '</a>',
//     },
//   };

//   const pagination = new Pagination('pagination', options);

//   pagination.on('afterMove', ({ page }) => {
//     callback(page);
//   });
// }

// export default startPagination;
// import Pagination from 'tui-pagination';
// import '../css/recipe-placeholder.css'; // Предполагаем, что файл стилей для пагинации подключен
// import { showRecipes, getRecipesData } from './all-recipes'; // Предполагаем, что у вас есть функции для отображения данных и получения данных с сервера
export async function getRecipesData(url = URL, params) {
  const { perPage, totalPages } = await getAllRecipes(url, params);

  return { perPage, totalPages };
}
async function showRecipes(url, params = {}) {
  const recipes = await createRecipeList(url, params);
  clearRecipeList();
  recipeList.insertAdjacentHTML('beforeend', recipes);
  markUpRating();
}

showRecipes(URL, { limit: limitCount });

// export { showRecipes };
// const URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
// const container = document.getElementById('tui-pagination-container');
// const windowWidth = document.documentElement.clientWidth;
// let limitCount = 0;
// if (windowWidth < 768) {
//   limitCount = 6;
// } else if (windowWidth > 768 && windowWidth < 1280) {
//   limitCount = 8;
// } else if (windowWidth > 1280) {
//   limitCount = 9;
// }

// // Заглушка для функции getRecipesData, предполагая, что она возвращает обещание с объектом,
// // содержащим данные пагинации, такие как perPage и totalPages.
// async function getRecipesData(url, params) {
//   return {
//     perPage: 10, // Предположим, что на каждой странице 10 элементов
//     totalPages: 32, // Всего 32 страницы
//   };
// }

// async function createPagination(url, params) {
//   // Получим данные пагинации
//   const { perPage, totalPages } = await getRecipesData(url, params);

//   // Опции для пагинации
//   const options = {
//     totalItems: perPage * totalPages,
//     itemsPerPage: perPage,
//     visiblePages: window.innerWidth < 768 ? 2 : 3,
//     page: 1,
//     centerAlign: false,
//     firstItemClassName: 'tui-first-child',
//     lastItemClassName: 'tui-last-child',
//     template: {
//       page: '<a href="#" class="pag__page-btn tui-page-btn">{{page}}</a>',
//       currentPage:
//         '<strong class="pag__current-page tui-page-btn tui-is-selected">{{page}}</strong>',
//       moveButton:
//         '<a href="#" class="pag__btn-move tui-page-btn tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</a>',
//       disabledMoveButton:
//         '<span class="pag__btn-move pag__btn-disabled tui-page-btn tui-is-disabled tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</span>',
//       moreButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//         '<span class="tui-ico-ellip">...</span>' +
//         '</a>',
//     },
//   };

//   // Создаем пагинацию
//   const paginationP = new Pagination(container, options);

//   // Обработчик события при изменении страницы
//   paginationP.on('afterMove', event => {
//     const currentPage = event.page;
//     showRecipes(url, { ...params, page: currentPage, limit: limitCount });
//   });
// }

// // Заглушка для функции showRecipes, предполагая, что она отображает данные на странице
// function showRecipes(url, params) {
//   console.log(`Show recipes on page ${params.page}`);
// }

// // Функция для отображения пагинации
// export function showPagination(url, params = {}) {
//   container.innerHTML = '';
//   createPagination(url, { ...params, limit: limitCount });
// }

// showPagination(URL);