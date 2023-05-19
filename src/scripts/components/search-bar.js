import { recipes } from "../api/recipes.js";
import { generateRecipeHTML } from "./recipe.js";

const searchInput = document.querySelector("#search-bar");
const recipeList = document.querySelector("#recipes-container");

export function searchRecipes(query) {
  return recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
      ) ||
      recipe.appliance.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ustensils.some((utensil) =>
        utensil.toLowerCase().includes(query.toLowerCase())
      )
    );
  });
}

let timerId;
let originalRecipes = recipes.slice();

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();

  clearTimeout(timerId);

  if (query.length >= 3) {
    timerId = setTimeout(() => {
      const filteredRecipes = searchRecipes(query);
      recipeList.innerHTML = "";
      filteredRecipes.forEach((recipe) => {
        const recipeElement = document.createElement("li");
        recipeElement.innerHTML = generateRecipeHTML(recipe);
        recipeList.appendChild(recipeElement);
      });
    }, 500);
  } else {
    recipeList.innerHTML = "";
    originalRecipes.forEach((recipe) => {
      const recipeHTML = generateRecipeHTML(recipe);
      recipeList.insertAdjacentHTML("beforeend", recipeHTML);
    });
  }
});
