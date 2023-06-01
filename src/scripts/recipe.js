import { recipes } from "./recipes.js";

let allRecipes = [];
allRecipes = [...recipes];
const container = document.getElementById("recipes-container");

export function renderRecipesCards(recipes) {
  let newRecipeCard = "";
  recipes.map((recipe) => {
    const ingredients = recipe.ingredients;

    // Ingredients' recipes cards
    let newIngredientTag = "";
    ingredients.map((ingredient) => {
      // fix unit's ingredients : Plural / singular or abbreviation
      let fixUnits =
        ingredient.unit === "grammes"
          ? ingredient.unit.replace("grammes", "g")
          : (ingredient.unit === "cuillère à soupe" ||
              ingredient.unit === "cuillère à café") &&
            ingredient.quantity !== 1
          ? ingredient.unit.replace(ingredient.unit, "cuillères")
          : (ingredient.unit === "cuillère à soupe" ||
              ingredient.unit === "cuillère à café") &&
            ingredient.quantity === 1
          ? ingredient.unit.replace(ingredient.unit, "cuillère")
          : (ingredient.unit === "gousse" || ingredient.unit === "sachet") &&
            ingredient.quantity !== 1
          ? ingredient.unit.concat("s")
          : ingredient.unit !== undefined
          ? ingredient.unit
          : "";

      // fix quantity's ingredients
      let fixQuantity =
        ingredient.quantity !== undefined ? `: ${ingredient.quantity}` : "";
      newIngredientTag += `
              <li class="card-ingredients-item list-group-item bg-transparent border-0 fw-bold p-0">
                  <span class="recipe-ingredient">${ingredient.ingredient}</span>
                  <span class="recipe-quantity fw-normal">
                      ${fixQuantity}
                  </span>
                  <span class="recipe-unit fw-normal">
                      ${fixUnits}
                  </span>
              </li>
              `;
    });

    // Create recipes' cards
    newRecipeCard += `
      <figure class="main__recipes__figure">
      <div class="main__recipes__figure__image-placeholder"></div>
      <figcaption class="main__recipes__figure__figcaption">
        <h2 class="main__recipes__figure__figcaption__title">${recipe.name}</h2>
        <p class="main__recipes__figure__figcaption__time">${recipe.time} min</p>
        <ul class="main__recipes__figure__figcaption__ingredients">${newIngredientTag}</ul>
        <p class="main__recipes__figure__figcaption__description">${recipe.description}</p>
      </figcaption>
    </figure>
          `;
  });
  container.innerHTML = newRecipeCard;
}
