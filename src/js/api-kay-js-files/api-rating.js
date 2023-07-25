import axios from 'axios';

async function setRecipeRating(recipeId, data) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}/rating`

  const res = await axios.patch(url, data);
  return res.data;
}

export { setRecipeRating };