import { recipes } from "../api/recipes.js";
import { updateDisplayedRecipes } from "../utils/filter.js";
import { generateRecipeHTML } from "./recipe.js";

export function populateIngredientsSelect(recipes) {
  const selectElement = document.getElementById("ingredients");
  const searchInput = document.getElementById("search-bar");

  const selectedIngredientElement = document.createElement("p");
  selectedIngredientElement.id = "selected-ingredient";
  selectElement.parentNode.insertBefore(
    selectedIngredientElement,
    selectElement.nextSibling
  );
  const searchIngredient = document.createElement("input");
  searchIngredient.type = "text";
  searchIngredient.placeholder = "Search ingredients";
  selectElement.parentNode.insertBefore(searchIngredient, selectElement);
  const selectedIngredients = new Set(); // To keep track of selected ingredients

  // Function to filter and populate the select element with ingredients
  const updateIngredientsSelect = (filteredRecipes) => {
    const ingredientsSet = new Set();

    filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const ingredientName = ingredient.ingredient;
        ingredientsSet.add(ingredientName);
      });
    });

    selectElement.innerHTML = ""; // Clear existing options

    ingredientsSet.forEach((ingredientName) => {
      const option = document.createElement("option");
      option.text = ingredientName;
      option.value = ingredientName;
      selectElement.appendChild(option);
    });
  };

  // Filter options based on user input
  searchInput.addEventListener("input", function () {
    const query = this.value.trim();
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
      );
    });

    // Update the ingredients select element
    updateIngredientsSelect(filteredRecipes);
  });

  searchIngredient.addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    Array.from(selectElement.options).forEach((option) => {
      const value = option.value.toLowerCase();
      option.style.display = value.includes(filter) ? "block" : "none";
    });
  });

  // Add event listener to update the selected ingredient element
  selectElement.addEventListener("change", function () {
    const selectedIngredient = this.value.toLowerCase();
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(selectedIngredient)
      );
    });

    // Add the selected ingredient to the set
    selectedIngredients.add(selectedIngredient);

    // Update the selected ingredient element
    selectedIngredientElement.textContent =
      Array.from(selectedIngredients).join(", ");
    selectedIngredientElement.style.display = "block";

    // Update the displayed recipes based on the selected ingredient
    updateDisplayedRecipes(filteredRecipes);
  });

  // Initialize ingredients select with all recipes
  updateIngredientsSelect(recipes);
}

// APLIANCES

export function populateApplianceSelect(recipes) {
  const selectElement = document.getElementById("appliance");
  const searchInput = document.getElementById("search-bar");

  const selectedApplianceElement = document.createElement("p");
  selectedApplianceElement.id = "selected-appliances";
  selectElement.parentNode.insertBefore(
    selectedApplianceElement,
    selectElement.nextSibling
  );

  const searchAppliance = document.createElement("input");
  searchAppliance.type = "text";
  searchAppliance.placeholder = "Search appliances";
  selectElement.parentNode.insertBefore(searchAppliance, selectElement);
  const selectedAppliances = new Set();

  const updateApplianceSelect = (filteredRecipes) => {
    const applianceSet = new Set();
    filteredRecipes.forEach((recipe) => {
      const appliance = recipe.appliance;
      if (!applianceSet.has(appliance)) {
        applianceSet.add(appliance);
      }
    });

    selectElement.innerHTML = "";

    applianceSet.forEach((appliance) => {
      const option = document.createElement("option");
      option.text = appliance;
      option.value = appliance;
      selectElement.appendChild(option);
    });
  };

  // Add search functionality to the appliance select

  // Filter options based on user input
  searchInput.addEventListener("input", function () {
    const query = this.value.trim();
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.appliance.toLowerCase().includes(query.toLowerCase());
    });

    // Update the appliance select element
    updateApplianceSelect(filteredRecipes);
  });

  searchAppliance.addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    Array.from(selectElement.options).forEach((option) => {
      const value = option.value.toLowerCase();
      option.style.display = value.includes(filter) ? "block" : "none";
    });
  });

  // Update displayed recipes when an appliance is selected
  selectElement.addEventListener("change", function () {
    const selectedAppliance = this.value.toLowerCase();
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.appliance.toLowerCase().includes(selectedAppliance);
    });

    // Add the selected appliance to the set
    selectedAppliances.add(selectedAppliance);

    // Update the selected appliance element
    selectedApplianceElement.textContent =
      Array.from(selectedAppliances).join(", ");
    selectedApplianceElement.style.display = "block";

    updateDisplayedRecipes(filteredRecipes);
  });

  // Initialize appliance select with all recipes
  updateApplianceSelect(recipes);
}

// USTENSILS

export function populateUstensilsSelect(recipes) {
  const selectElement = document.getElementById("ustensils");
  const searchInput = document.getElementById("search-bar");

  const selectedUstensilsElement = document.createElement("p");
  selectedUstensilsElement.id = "selected-ustensils";
  selectElement.parentNode.insertBefore(
    selectedUstensilsElement,
    selectElement.nextSibling
  );

  const searchUstensils = document.createElement("input");
  searchUstensils.type = "text";
  searchUstensils.placeholder = "Search utensils";
  selectElement.parentNode.insertBefore(searchUstensils, selectElement);
  const selectedUstensils = new Set();

  const updateUstensilsSelect = (filteredRecipes) => {
    const ustensilsSet = new Set();
    filteredRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        if (!ustensilsSet.has(ustensil)) {
          ustensilsSet.add(ustensil);
          const option = document.createElement("option");
          option.text = ustensil;
          option.value = ustensil;
          selectElement.appendChild(option);
        }
      });
    });
  };

  // Filter options based on user input
  searchInput.addEventListener("input", function () {
    const query = this.value.trim();
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(query.toLowerCase())
      );
    });

    // Update the utensils select element
    updateUstensilsSelect(filteredRecipes);
  });

  searchUstensils.addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    Array.from(selectElement.options).forEach((option) => {
      const value = option.value.toLowerCase();
      option.style.display = value.includes(filter) ? "block" : "none";
    });
  });

  // Update displayed recipes when a utensil is selected
  selectElement.addEventListener("change", function () {
    const selectedUstensil = this.value.toLowerCase();
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(selectedUstensil)
      );
    });

    // Add the selected utensil to the set
    selectedUstensils.add(selectedUstensil);

    // Update the selected utensils element
    selectedUstensilsElement.textContent =
      Array.from(selectedUstensils).join(", ");
    selectedUstensilsElement.style.display = "block";

    updateDisplayedRecipes(filteredRecipes);
  });

  // Initialize utensils select with all recipes
  updateUstensilsSelect(recipes);
}
