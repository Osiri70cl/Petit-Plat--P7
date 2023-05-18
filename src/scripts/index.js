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

function populateIngredientsSelect(recipes) {
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

  // Helper function to update the displayed recipes
  const updateDisplayedRecipes = (filteredRecipes) => {
    recipeList.innerHTML = "";
    filteredRecipes.forEach((recipe) => {
      const recipeElement = document.createElement("li");
      recipeElement.innerHTML = generateRecipeHTML(recipe);
      recipeList.appendChild(recipeElement);
    });
  };

  // Initialize ingredients select with all recipes
  updateIngredientsSelect(recipes);
}

populateIngredientsSelect(recipes);

function populateApplianceSelect(recipes) {
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

  // Helper function to update the displayed recipes
  const updateDisplayedRecipes = (filteredRecipes) => {
    recipeList.innerHTML = "";
    filteredRecipes.forEach((recipe) => {
      const recipeElement = document.createElement("li");
      recipeElement.innerHTML = generateRecipeHTML(recipe);
      recipeList.appendChild(recipeElement);
    });
  };

  // Initialize appliance select with all recipes
  updateApplianceSelect(recipes);
}

populateApplianceSelect(recipes);

// a faire !!!!

function populateUstensilsSelect(recipes) {
  const ustensilsSet = new Set();
  const selectedUstensils = new Set(); // To keep track of selected ustensils

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

  // Add search functionality to the ustensils select
  const selectElement = document.getElementById("ustensils");
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search ustensils";
  selectElement.parentNode.insertBefore(searchInput, selectElement);

  // Filter options based on user input
  searchInput.addEventListener("input", function () {
    const query = this.value.trim();
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(query.toLowerCase())
      );
    });

    // Update the ustensils select element
    updateUstensilsSelect(filteredRecipes);
  });

  const selectedUstensilsElement = document.createElement("p");
  selectedUstensilsElement.id = "selected-ustensils";
  selectElement.parentNode.insertBefore(
    selectedUstensilsElement,
    selectElement.nextSibling
  );

  // Update displayed recipes when an ustensil is selected
  selectElement.addEventListener("change", function () {
    const selectedUstensil = this.value.toLowerCase();
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(selectedUstensil)
      );
    });

    // Add the selected ustensil to the set
    selectedUstensils.add(selectedUstensil);

    // Update the selected ustensils element
    selectedUstensilsElement.textContent =
      Array.from(selectedUstensils).join(", ");
    selectedUstensilsElement.style.display = "block";

    updateDisplayedRecipes(filteredRecipes);
  });

  // Helper function to update the displayed recipes
  const updateDisplayedRecipes = (filteredRecipes) => {
    recipeList.innerHTML = "";
    filteredRecipes.forEach((recipe) => {
      const recipeElement = document.createElement("li");
      recipeElement.innerHTML = generateRecipeHTML(recipe);
      recipeList.appendChild(recipeElement);
    });
  };

  // Helper function to update the ustensils select options
  const updateUstensilsSelect = (filteredRecipes) => {
    const ustensilsSet = new Set();
    filteredRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        ustensilsSet.add(ustensil);
      });
    });

    selectElement.innerHTML = ""; // Clear existing options

    ustensilsSet.forEach((ustensil) => {
      const option = document.createElement("option");
      option.text = ustensil;
      option.value = ustensil;
      selectElement.appendChild(option);
    });
  };

  // Initialize ustensils select with all recipes
  updateUstensilsSelect(recipes);
}

populateUstensilsSelect(recipes);

function filterRecipes() {
  const selectedIngredients = Array.from(
    document.querySelectorAll("#ingredients option:checked")
  ).map((option) => option.value.toLowerCase());
  const selectedAppliance = document
    .getElementById("appliance")
    .value.toLowerCase();
  const selectedUtensils = Array.from(
    document.querySelectorAll("#ustensils option:checked")
  ).map((option) => option.value.toLowerCase());

  const filteredRecipes = recipes.filter((recipe) => {
    const hasSelectedIngredients = selectedIngredients.every(
      (selectedIngredient) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(selectedIngredient)
        )
    );

    const hasSelectedAppliance = recipe.appliance
      .toLowerCase()
      .includes(selectedAppliance);

    const hasSelectedUtensils = selectedUtensils.every((selectedUtensil) =>
      recipe.ustensils.some((utensil) =>
        utensil.toLowerCase().includes(selectedUtensil)
      )
    );

    return (
      hasSelectedIngredients && hasSelectedAppliance && hasSelectedUtensils
    );
  });

  updateDisplayedRecipes(filteredRecipes);
}

filterRecipes(recipes);

recipes.sort((a, b) => a.name.localeCompare(b.name));
recipes.forEach((recipe) => {
  const recipeHTML = generateRecipeHTML(recipe);
  recipeList.insertAdjacentHTML("beforeend", recipeHTML);
});

function updateDisplayedRecipes(filteredRecipes) {
  const recipeList = document.querySelector("#recipes-container");
  recipeList.innerHTML = "";

  // Render the filtered recipes
  filteredRecipes.forEach((recipe) => {
    const recipeHTML = generateRecipeHTML(recipe);
    recipeList.insertAdjacentHTML("beforeend", recipeHTML);
  });
}
