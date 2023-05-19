import { recipes } from "./api/recipes.js";
import { generateRecipeHTML } from "./components/recipe.js";
import { searchRecipes } from "./components/search-bar.js";
import { filterRecipes } from "./utils/filter.js";
import {
  populateIngredientsSelect,
  populateApplianceSelect,
  populateUstensilsSelect,
} from "./components/tags.js";

const recipeList = document.querySelector("#recipes-container");

populateIngredientsSelect(recipes);
populateApplianceSelect(recipes);
populateUstensilsSelect(recipes);

filterRecipes(recipes);

recipes.sort((a, b) => a.name.localeCompare(b.name));
recipes.forEach((recipe) => {
  const recipeHTML = generateRecipeHTML(recipe);
  recipeList.insertAdjacentHTML("beforeend", recipeHTML);
});
