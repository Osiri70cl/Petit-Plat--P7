// const searchInput = document.querySelector("#search-bar-input");
const recipeList = document.querySelector("#container-cards-recipes");

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
    let match = false;
    const lowerCaseQuery = query.toLowerCase();

    match = recipe.name.toLowerCase().includes(lowerCaseQuery);

    if (!match) {
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().includes(lowerCaseQuery)) {
          match = true;
        }
      });
    }

    if (!match) {
      match = recipe.appliance.toLowerCase().includes(lowerCaseQuery);
    }

    if (!match) {
      recipe.ustensils.forEach((utensil) => {
        if (utensil.toLowerCase().includes(lowerCaseQuery)) {
          match = true;
        }
      });
    }

    return match;
  });
}

let timerId;
let originalRecipes = recipes.slice();

function searchInput(query) {
  clearTimeout(timerId);

  if (query.length >= 3) {
    timerId = setTimeout(() => {
      const filteredRecipes = searchRecipes(query);
      recipeList.innerHTML = "";
    }, 500);
  } else {
    recipeList.innerHTML = "";
    originalRecipes.forEach((recipe) => {
      const recipeHTML = generateRecipeHTML(recipe);
      recipeList.insertAdjacentHTML("beforeend", recipeHTML);
    });
  }
}

recipes.sort((a, b) => a.name.localeCompare(b.name));
recipes.forEach((recipe) => {
  const recipeHTML = generateRecipeHTML(recipe);
  recipeList.insertAdjacentHTML("beforeend", recipeHTML);
});

function updateDisplayedRecipes(recipes) {
  const recipeList = document.querySelector("#recipes-container");
  recipeList.innerHTML = "";
}

searchInput("coco");
