// // Modal Rating in progres
// LOCALSTORAGE_KEY
// const fetchFavoriteRecipes = async () => {
//   try {
//     const response = await axios.get("https://tasty-treats-backend.p.goit.global/api/recipes/popular");
//     const favoriteRecipes = response.data.recipes;
//     return favoriteRecipes;
//   } catch (error) {
//     console.error("Error fetching favorite recipes:", error);
//     return [];
//   }
// };

// const renderFavoriteRecipes = (recipes) => {
//   const favoritesContainer = document.getElementById("favoritesContainer");
//   const noFavoritesMessage = document.getElementById("noFavoritesMessage");

//   if (recipes.length > 0) {
//     noFavoritesMessage.style.display = "none";
//     favoritesContainer.innerHTML = recipes
//       .map((recipe) => createRecipeCard(recipe))
//       .join("");
//   } else {
//     noFavoritesMessage.style.display = "block";
//     favoritesContainer.innerHTML = "";
//   }
// };

// const createRecipeCard = (recipe) => {
//   return `
//     <div class="recipe-card">
//       <h3>${recipe.title}</h3>
//       <p>${recipe.description}</p>
//       <img src="${recipe.image}" alt="${recipe.title}" />
//       <p>Rating: ${recipe.rating}</p>
//       <p>Preparation Time: ${recipe.preparationTime} minutes</p>
//       <button class="remove-favorite" data-id="${recipe.id}">Remove from Favorites</button>
//     </div>
//   `;
// };


// const handleRemoveFavoriteClick = async (event) => {
//   if (event.target.classList.contains("remove-favorite")) {
//     const recipeId = event.target.dataset.id;

//     const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
//     const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
//     localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));

//     const updatedFavoriteRecipes = await fetchFavoriteRecipes();
//     renderFavoriteRecipes(updatedFavoriteRecipes);
//   }
// };

// document.addEventListener("DOMContentLoaded", async () => {
//   const favoriteRecipes = await fetchFavoriteRecipes();
//   renderFavoriteRecipes(favoriteRecipes);
// });

// document.addEventListener("click", handleRemoveFavoriteClick);
