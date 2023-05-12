import { recipes } from "./api/recipes.js";

const searchInput = document.querySelector("#search-bar");
const recipeList = document.querySelector("#recipes-container");

function generateRecipeHTML(recipe) {
  // Get the ingredients HTML
  const ingredientsHTML = recipe.ingredients
    .map((ingredient) => {
      const quantity = ingredient.quantity ? ingredient.quantity + " " : "";
      const unit = ingredient.unit ? ingredient.unit + " de " : "";
      return `<li>${quantity}${unit}${ingredient.ingredient}</li>`;
    })
    .join("");

  // Generate the figure HTML
  const figureHTML = `
    <figure class="main__recipes__figure">
      <div class="main__recipes__figure__image-placeholder"></div>
      <figcaption class="main__recipes__figure__figcaption">
        <h2 class="main__recipes__figure__figcaption__title">${recipe.name}</h2>
        <p class="main__recipes__figure__figcaption__time">${recipe.time} min</p>
        <ul class="main__recipes__figure__figcaption__ingredients">${ingredientsHTML}</ul>
        <p class="main__recipes__figure__figcaption__description">${recipe.description}</p>
      </figcaption>
    </figure>
  `;

  return figureHTML;
}

function searchRecipes(query) {
  return recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
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
    recipeList.innerHTML = ""; // clear the list first
    originalRecipes.forEach((recipe) => {
      const recipeHTML = generateRecipeHTML(recipe);
      recipeList.insertAdjacentHTML("beforeend", recipeHTML);
    });
  }
});

function populateIngredientsSelect(recipes) {
  const ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient;
      if (!ingredientsSet.has(ingredientName)) {
        ingredientsSet.add(ingredientName);
        const option = document.createElement("option");
        option.text = ingredientName;
        option.value = ingredientName;
        document.getElementById("ingredients").appendChild(option);
      }
    });
  });
}

populateIngredientsSelect(recipes);

function populateApplianceSelect(recipes) {
  const applianceSet = new Set();
  recipes.forEach((recipe) => {
    const appliance = recipe.appliance;
    const singularAppliance = appliance.replace(/s$/, "");
    if (!applianceSet.has(singularAppliance) && !applianceSet.has(appliance)) {
      applianceSet.add(singularAppliance);
      applianceSet.add(appliance);
      const option = document.createElement("option");
      option.text = appliance;
      option.value = appliance;
      document.getElementById("appliance").appendChild(option);
    }
  });
}

populateApplianceSelect(recipes);

function populateUstensilsSelect(recipes) {
  const ustensilsSet = new Set();
  recipes.forEach((recipe) => {
    const ustensils = recipe.ustensils;
    ustensils.forEach((ustensil) => {
      if (!ustensilsSet.has(ustensil)) {
        ustensilsSet.add(ustensil);
        const option = document.createElement("option");
        option.text = ustensil;
        option.value = ustensil;
        document.getElementById("ustensils").appendChild(option);
      }
    });
  });
}

populateUstensilsSelect(recipes);

recipes.sort((a, b) => a.name.localeCompare(b.name));
recipes.forEach((recipe) => {
  const recipeHTML = generateRecipeHTML(recipe);
  recipeList.insertAdjacentHTML("beforeend", recipeHTML);
});
