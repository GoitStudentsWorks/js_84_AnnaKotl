// // // Modal Rating in progres
// // LOCALSTORAGE_KEY

//   const recipesFromLocalStorage = [
//     {
//       id: 1,
//       image: "recipe1.jpg",
//       title: "Рецепт 1",
//       description: "",
//       rating: 4.5,
//       time: "30 хв",
//       isFavorite: true,
//     },
//     {
//       id: 2,
//       image: "recipe2.jpg",
//       title: "Рецепт 2",
//       description: "",
//       rating: 3.8,
//       time: "45 хв",
//       isFavorite: true,
//     },
//   ];

//   function createRecipeCard(recipe) {
//     return `
//       <div class="recipe-card">
//         <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
//         <h3 class="recipe-title">${recipe.title}</h3>
//         <p class="recipe-description">${recipe.description}</p>
//         <div class="recipe-details">
//           <span class="recipe-rating">${recipe.rating}</span>
//           <span class="recipe-time">${recipe.time}</span>
//           <span class="favorite-icon"></span>
//         </div>
//       </div>
//     `;
//   }

//   const favoritesContainer = document.getElementById("favoritesContainer");

//   function showFavorites() {
//     favoritesContainer.innerHTML = "";

//     if (recipesFromLocalStorage.length > 0) {
//       recipesFromLocalStorage.forEach((recipe) => {
//         favoritesContainer.innerHTML += createRecipeCard(recipe);
//       });
//     } else {

//       const noFavoritesMessage = document.getElementById("noFavoritesMessage");
//       noFavoritesMessage.style.display = "block";
//     }
//   }

//   showFavorites();


// //////////////// 2
function getSavedFavorites() {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
}

function showFavoritesCategories() {
  const favoritesCategories = document.getElementById("favoritesCategories");
  favoritesCategories.innerHTML = "";

  const savedFavorites = getSavedFavorites();

  const categories = [...new Set(savedFavorites.map((recipe) => recipe.category))];

  const allCategoriesBtn = document.createElement("button");
  allCategoriesBtn.textContent = "All categories";
  allCategoriesBtn.classList.add("favorites-category-btn", "active");
  favoritesCategories.appendChild(allCategoriesBtn);

  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.textContent = category;
    categoryBtn.classList.add("favorites-category-btn");
    favoritesCategories.appendChild(categoryBtn);
  });
}

function showFavoritesRecipesByCategory(category) {
  const favoritesRecipeContainer = document.getElementById("favoritesRecipeContainer");
  favoritesRecipeContainer.innerHTML = "";

  const savedFavorites = getSavedFavorites();

  const filteredRecipes = category === "All categories"
    ? savedFavorites
    : savedFavorites.filter((recipe) => recipe.category === category);

  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach((recipe) => {
      favoritesRecipeContainer.innerHTML += createRecipeCard(recipe);
    });
  } else {

    favoritesRecipeContainer.innerHTML = "<p>No recipes found.</p>";
  }
}

const favoritesCategories = document.getElementById("favoritesCategories");

favoritesCategories.addEventListener("click", (event) => {
  if (event.target.classList.contains("favorites-category-btn")) {
    const category = event.target.textContent;
    const activeCategoryBtn = document.querySelector(".favorites-category-btn.active");
    if (activeCategoryBtn) {
      activeCategoryBtn.classList.remove("active");
    }
    event.target.classList.add("active");
    showFavoritesRecipesByCategory(category);
  }
});

showFavoritesCategories();
showFavoritesRecipesByCategory("All categories");
