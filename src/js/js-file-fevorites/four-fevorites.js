// // // Modal Rating in progres
// // LOCALSTORAGE_KEY
// <!-- Припустимо, у нас є масив об'єктів з рецептами, які зберігаються у localStorage -->
// <script>
//   const recipesFromLocalStorage = [
//     {
//       id: 1,
//       image: "recipe1.jpg",
//       title: "Рецепт 1",
//       description: "Це перший рецепт у вашому списку Favorites.",
//       rating: 4.5,
//       time: "30 хв",
//       isFavorite: true,
//     },
//     {
//       id: 2,
//       image: "recipe2.jpg",
//       title: "Рецепт 2",
//       description: "Це другий рецепт у вашому списку Favorites.",
//       rating: 3.8,
//       time: "45 хв",
//       isFavorite: true,
//     },
//     // Додайте більше рецептів за необхідності
//   ];

//   // Функція для створення HTML-коду для кожного рецепту
//   function createRecipeCard(recipe) {
//     return `
//       <div class="recipe-card">
//         <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
//         <h3 class="recipe-title">${recipe.title}</h3>
//         <p class="recipe-description">${recipe.description}</p>
//         <div class="recipe-details">
//           <span class="recipe-rating">Рейтинг: ${recipe.rating}</span>
//           <span class="recipe-time">Час приготування: ${recipe.time}</span>
//           <span class="favorite-icon">&#10084;</span>
//         </div>
//       </div>
//     `;
//   }

//   // Отримуємо контейнер, в який будемо додавати рецепти
//   const favoritesContainer = document.getElementById("favoritesContainer");

//   // Функція для відображення рецептів у сторінці Favorites
//   function showFavorites() {
//     // Очищаємо контейнер перед додаванням рецептів
//     favoritesContainer.innerHTML = "";

//     // Перевіряємо наявність рецептів у localStorage та показуємо їх у сторінці Favorites
//     if (recipesFromLocalStorage.length > 0) {
//       recipesFromLocalStorage.forEach((recipe) => {
//         favoritesContainer.innerHTML += createRecipeCard(recipe);
//       });
//     } else {
//       // Якщо немає рецептів у localStorage, показуємо повідомлення
//       const noFavoritesMessage = document.getElementById("noFavoritesMessage");
//       noFavoritesMessage.style.display = "block";
//     }
//   }

//   // Викликаємо функцію для показу рецептів у сторінці Favorites
//   showFavorites();
// </script>
