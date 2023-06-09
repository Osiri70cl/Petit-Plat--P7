// Dropdown container list tags
const ingredientsListTags = document.getElementById("ingredients-list-tags");
const appliancesListTags = document.getElementById("appliances-list-tags");
const ustensilsListTags = document.getElementById("ustensils-list-tags");

let ingredientsListArray = [];
let appliancesListArray = [];
let ustensilsListArray = [];

// List Tags Ingredients for filter
function renderIngredientsList(recipes) {
  let allIngredientsRecipes = [];

  recipes.map((recipe) => {
    recipe.ingredients.map((ingredients) => {
      const ingredient = ingredients.ingredient;
      allIngredientsRecipes.push(ingredient);
    });
  });
  ingredientsListArray = [...new Set(allIngredientsRecipes)];

  renderIngredientsListFiltred(ingredientsListArray);
}

// List Tags Ingredients for search in dropdown input
function renderIngredientsListFiltred(ingredientsListArray) {
  const newItemIngredient = ingredientsListArray
    .map((item) => {
      if (filteredTagsArr.includes(item)) {
        // Skip rendering the ingredient if it is found in filteredTagsArr
        return "";
      } else {
        return `
        <a href="#" class="list-tags-item ingredients"
          arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-color="blue" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
          ${item}
        </a>
      `;
      }
    })
    .join("");
  ingredientsListTags.innerHTML = newItemIngredient;
}

// List Tags Appliances
function renderAppliancesList(recipes) {
  let allAppliancesRecipes = [];

  recipes.map((recipes) => {
    const appliances = recipes.appliance;
    allAppliancesRecipes.push(appliances);
  });
  appliancesListArray = [...new Set(allAppliancesRecipes)];

  renderAppliancesListFiltred(appliancesListArray);
}

// List Tags Appliances for search in dropdown input
function renderAppliancesListFiltred(appliancesListArray) {
  const newItemAppliance = appliancesListArray
    .map((item) => {
      if (filteredTagsArr.includes(item)) {
        // Skip rendering the item if it is found in filteredTagsArr
        return "";
      } else {
        return `
        <a href="#" class="list-tags-item appliances"
          arial-label="Rechercher des recettes utilisant l'appareil: '${item}'" data-color="green" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
          ${item}
      </a>
      `;
      }
    })
    .join("");
  appliancesListTags.innerHTML = newItemAppliance;
}

// List Tags Ustensils
function renderUstensilsList(recipes) {
  let allUstensilsRecipes = [];

  recipes.map((recipes) => {
    const ustensils = recipes.ustensils;

    ustensils.map((ustensils) => {
      const ustensil = ustensils.ustensil;
      allUstensilsRecipes.push(ustensils);
    });
  });
  ustensilsListArray = [...new Set(allUstensilsRecipes)];

  renderUstensilsListFiltred(ustensilsListArray);
}

// List Tags Ustensils for search in dropdown input
function renderUstensilsListFiltred(ustensilsListArray) {
  const newItemUstensil = ustensilsListArray
    .map((item) => {
      if (filteredTagsArr.includes(item)) {
        // Skip rendering the item if it is found in filteredTagsArr
        return "";
      } else {
        return `
        <a href="#" class="list-tags-item"
          arial-label="Rechercher des recettes utilisant l'ustensil: '${item}'" data-color="orange" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
          ${item}
      </a>
      `;
      }
    })

    .join("");
  ustensilsListTags.innerHTML = newItemUstensil;
}
