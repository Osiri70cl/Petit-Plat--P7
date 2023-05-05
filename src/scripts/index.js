import { recipes } from "./api/recipes.js";


function generateRecipeHTML(recipe) {
  // Get the ingredients HTML
  const ingredientsHTML = recipe.ingredients.map((ingredient) => {
    const quantity = ingredient.quantity ? ingredient.quantity + ' ' : '';
    const unit = ingredient.unit ? ingredient.unit + ' de ' : '';
    return `<li>${quantity}${unit}${ingredient.ingredient}</li>`;
  }).join('');

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


function generateIngHTML(recipe) {
  const allIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredient);
  const uniqueIngredients = [...new Set(allIngredients)];
  const ingredientsListHTML = uniqueIngredients.map((ingredient) => {
    return `<li>${ingredient}</li>`;
  }).join('');
  const IngListHTML = `
    <option value="${ingredientsListHTML}">${ingredientsListHTML}</option>
  `;

  return IngListHTML;
}



function generateApplianceHTML(recipe) {
  const uniqueAppliances = new Set();
  recipes.forEach(recipe => {
    uniqueAppliances.add(recipe.appliance);
  });
  const sortedAppliances = Array.from(uniqueAppliances).sort();
  const ApplianceHTML = sortedAppliances.map(appliance => `
    <option value="${appliance}">${appliance}</option>
  `);
  return ApplianceHTML;
}


function generateStencilsHTML(recipe) {
  const uniqueUstensils = [...new Set(recipe.ustensils)];
  const optionHTML = uniqueUstensils.map((ustensil) => {
    return `<option value="${ustensil}">${ustensil}</option>`;
  }).join('');
  const StencilsHTML = `
       ${optionHTML}
  `;
  return StencilsHTML;
}


// get the select elements
const ingredientSelect = document.getElementById('ingredients');
const applianceSelect = document.getElementById('appliance');
const ustensilsSelect = document.getElementById('stencils');

// listen for changes in the select elements and filter the recipes accordingly
ingredientSelect.addEventListener('change', () => {
  const selectedIngredients = Array.from(ingredientSelect.selectedOptions).map(option => option.value);
  const filteredRecipes = recipes.filter(recipe => {
    return selectedIngredients.every(ingredient => recipe.ingredients.some(ri => ri.ingredient.toLowerCase().includes(ingredient.toLowerCase())));
  });
  displayRecipes(filteredRecipes);
});

applianceSelect.addEventListener('change', () => {
  const selectedAppliance = applianceSelect.value;
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.appliance.toLowerCase().includes(selectedAppliance.toLowerCase());
  });
  displayRecipes(filteredRecipes);
});

ustensilsSelect.addEventListener('change', () => {
  const selectedUstensil = ustensilsSelect.value;
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedUstensil.toLowerCase()));
  });
  displayRecipes(filteredRecipes);
});

// a helper function to display the filtered recipes
function displayRecipes(filteredRecipes) {
  recipesContainer.innerHTML = '';
  filteredRecipes.forEach((recipe) => {
    const recipeHTML = generateRecipeHTML(recipe);
    recipesContainer.insertAdjacentHTML('beforeend', recipeHTML);
  });
}

const recipesContainer = document.getElementById("recipes-container");
const ingContainer = document.getElementById("ingredients");
const applianceContainer = document.getElementById("appliance");
const stencilsContainer = document.getElementById("stencils");

recipes.forEach((recipe) => {
  const recipeHTML = generateRecipeHTML(recipe);
  recipesContainer.insertAdjacentHTML('beforeend', recipeHTML);
  const IngHTML = generateIngHTML(recipe);
  ingContainer.insertAdjacentHTML('beforeend', IngHTML);
  const ApplianceHTML = generateApplianceHTML(recipe);
  applianceContainer.insertAdjacentHTML('beforeend', ApplianceHTML);
  const StencilsHTML = generateStencilsHTML(recipe);
  stencilsContainer.insertAdjacentHTML('beforeend', StencilsHTML);
});