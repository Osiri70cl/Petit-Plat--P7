import { recipes } from "./recipes.js";
import { renderRecipesCards } from "./recipe.js";
import {
  renderIngredientsList,
  renderAppliancesList,
  renderUstensilsList,
} from "./tags.js";
// import { searchRecipes } from "./components/search-bar.js";
// import { filterRecipes } from "./utils/filter.js";
// import {
//   populateIngredientsSelect,
//   populateApplianceSelect,
//   populateUstensilsSelect,
// } from "./components/tags.js";
let allRecipes = [];
allRecipes = [...recipes];
let filteredTagsArr = [];
let tagBgColorArray = [];

const searchBar = document.getElementById("search-bar-input");
const alertMessage = document.getElementById("alert-message");
// const recipeList = document.querySelector("#recipes-container");

// populateIngredientsSelect(recipes);
// populateApplianceSelect(recipes);
// populateUstensilsSelect(recipes);

// filterRecipes(recipes);

// recipes.sort((a, b) => a.name.localeCompare(b.name));
// recipes.forEach((recipe) => {
//   const recipeHTML = generateRecipeHTML(recipe);
//   recipeList.insertAdjacentHTML("beforeend", recipeHTML);
// });

const init = function () {
  renderRecipesCards(allRecipes);
  renderIngredientsList(allRecipes);
  renderAppliancesList(allRecipes);
  renderUstensilsList(allRecipes);
  searchBar.value = "";
  filteredTagsArr = [];
  tagBgColorArray = [];
  renderFilteredTags();
};
init();

searchBar.addEventListener("click", function () {
  closeAllDropdowns();
  init();
});

searchBar.addEventListener("input", function () {
  requestBySearchBar(searchBar.value);
});

// change the focus input ==> cards with e.key 'ENTER'
searchBar.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === 13) {
    searchBar.blur();
    cardsEl[0].focus();
  }
});

ingredientsSearch.addEventListener("input", function () {
  searchIngredientsList(ingredientsSearch.value);
});

appliancesSearch.addEventListener("input", function () {
  searchAppliancesList(appliancesSearch.value);
});

ustensilsSearch.addEventListener("input", function () {
  searchUstensilsList(ustensilsSearch.value);
});
