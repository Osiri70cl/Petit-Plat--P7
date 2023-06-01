const listTagsItem = document.querySelectorAll(".list-tags-item");

//filtered tags
const filteredTagsList = document.querySelector(".filtered-tags-list");
const filteredTagsItem = document.getElementsByClassName("filtered-tags-item");

// Dropdown container list tags
const ingredientsListTags = document.getElementById("ingredients-list-tags");
const appliancesListTags = document.getElementById("appliances-list-tags");
const ustensilsListTags = document.getElementById("ustensils-list-tags");

let filteredTagsArr = [];
let filteredTagValue;

let tagBgColorArray = [];
let tagBgColor;

let ingredientsListArray = [];
let appliancesListArray = [];
let ustensilsListArray = [];

function addNewTag(event, tagBgColor) {
  filteredTagValue = event.target.dataset.value;
  if (filteredTagsArr.includes(filteredTagValue)) {
    return;
  } else {
    filteredTagsArr.push(filteredTagValue);
    tagBgColor = event.target.dataset.color;
    tagBgColorArray.push(tagBgColor);

    renderFilteredTags();
    handlerRequestByTags();
  }
  console.log(filteredTagsArr);
}

export function renderFilteredTags() {
  let newTag = "";
  for (let i = 0; i < filteredTagsArr.length; i++) {
    newTag += `
        <li class="filtered-tags-item list-group-item d-flex align-items-center rounded-3 border-light ps-3 py-2 me-2 mb-2 fw-bold text-white bg-${tagBgColorArray[i]}"
           data-tag="#${i}">
                ${filteredTagsArr[i]}
            <button class="filtered-tags-btn ms-3" type="button" aria-label="Supprimer le tag" onclick="deleteTag(${i})"></button>
        </li>`;
  }
  //adding new tag inside ul tag
  filteredTagsList.innerHTML = newTag;
  closeAllDropdowns();
}

function deleteTag(index) {
  // delete or remove the tag name
  filteredTagsArr.splice(index, 1);
  // delete or remove the tag color
  tagBgColorArray.splice(index, 1);

  renderFilteredTags();
  handlerRequestByTags();
  console.log(filteredTagsArr);
}

// List Tags Ingredients for filter
export function renderIngredientsList(recipes) {
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
export function renderIngredientsListFiltred(ingredientsListArray) {
  const newItemIngredient = ingredientsListArray
    .map(
      (item) => `
        <a href="#" class="list-tags-item ingredients col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-color="blue" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
            ${item}
        </a>
        `
    )
    .join("");
  ingredientsListTags.innerHTML = newItemIngredient;
}

//=====================================
// APPLIANCES
//=====================================

// List Tags Appliances
export function renderAppliancesList(recipes) {
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
    .map(
      (item) => `
        <a href="#" class="list-tags-item appliances col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes utilisant l'appareil: '${item}'" data-color="green" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
        `
    )
    .join("");
  appliancesListTags.innerHTML = newItemAppliance;
}

//=====================================
// USTENSILS
//=====================================

// List Tags Ustensils
export function renderUstensilsList(recipes) {
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
    .map(
      (item) => `
        <a href="#" class="list-tags-item ustensils col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes utilisant l'ustensil: '${item}'" data-color="orange" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
        `
    )
    .join("");
  ustensilsListTags.innerHTML = newItemUstensil;
}
