// import { recipes } from "../api/recipes.js";
// import { generateRecipeHTML } from "../components/recipe.js";

// export function filterRecipes() {
//   const selectedIngredients = Array.from(
//     document.querySelectorAll("#ingredients option:checked")
//   ).map((option) => option.value.toLowerCase());
//   const selectedAppliance = document
//     .getElementById("appliance")
//     .value.toLowerCase();
//   const selectedUtensils = Array.from(
//     document.querySelectorAll("#ustensils option:checked")
//   ).map((option) => option.value.toLowerCase());

//   const filteredRecipes = recipes.filter((recipe) => {
//     const hasSelectedIngredients = selectedIngredients.every(
//       (selectedIngredient) =>
//         recipe.ingredients.some((ingredient) =>
//           ingredient.ingredient.toLowerCase().includes(selectedIngredient)
//         )
//     );

//     const hasSelectedAppliance = recipe.appliance
//       .toLowerCase()
//       .includes(selectedAppliance);

//     const hasSelectedUtensils = selectedUtensils.every((selectedUtensil) =>
//       recipe.ustensils.some((utensil) =>
//         utensil.toLowerCase().includes(selectedUtensil)
//       )
//     );

//     return (
//       hasSelectedIngredients && hasSelectedAppliance && hasSelectedUtensils
//     );
//   });

//   updateDisplayedRecipes(filteredRecipes);
// }

// export function updateDisplayedRecipes(filteredRecipes) {
//   const recipeList = document.querySelector("#recipes-container");
//   recipeList.innerHTML = "";

//   // Render the filtered recipes
//   filteredRecipes.forEach((recipe) => {
//     const recipeHTML = generateRecipeHTML(recipe);
//     recipeList.insertAdjacentHTML("beforeend", recipeHTML);
//   });
// }
