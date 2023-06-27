const searchBar = document.getElementById("search-bar-input");
const wrapperHomepage = document.getElementById("wrapper-homepage");
const containerCards = document.getElementById("container-cards-recipes");
const cardsRecipes = document.getElementsByClassName("card-recipe");
const cardsEl = document.getElementsByClassName("card");

let allRecipes = [];
allRecipes = [...recipes];

let filterCardsByInput = [];
let filterFurtherByTags = [];
let filterCardsByTags = [];

let ingredientsListFiltred = [];
let appliancesListFiltred = [];
let ustensilsListFiltred = [];

function renderRecipesCards(recipes) {
  let newRecipeCard = "";
  recipes.map((recipe) => {
    const ingredients = recipe.ingredients;

    let newIngredientTag = "";
    ingredients.map((ingredient) => {
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

      let fixQuantity =
        ingredient.quantity !== undefined ? `: ${ingredient.quantity}` : "";
      newIngredientTag += `
            <li class="card-ingredients-item list-group-item">
                <span class="recipe-ingredient">${ingredient.ingredient}</span>
                <span class="recipe-quantity ">
                    ${fixQuantity}
                </span>
                <span class="recipe-unit">
                    ${fixUnits}
                </span>
            </li>
            `;
    });

    newRecipeCard += `
        <a href="#" id="${recipe.id}" aria-label="Accéder à la fiche de recette: '${recipe.name}'" tabindex="0" class="card-width" >
            <figure class="main__container-card__figure" >
                <div class="main__container-card__figure__img"></div>
                <figcaption class="main__container-card__figure__caption">
                    <div class="main__container-card__figure__caption__head">
                        <h2 class="main__container-card__figure__caption__head__title">${recipe.name}</h2>
                        <div class="main__container-card__figure__caption__head__time">
                            <img class="main__container-card__figure__caption__head__time__img" src="../assets/clock.svg" width="20" height="20" alt=""
                                aria-hidden="true">
                            <p class="main__container-card__figure__caption__head__time__text "><span>${recipe.time}</span> min</p>
                        </div>
                    </div>
                    <div class="main__container-card__figure__caption__content">
                        <div class="main__container-card__figure__caption__content__list">
                            <ul class="main__container-card__figure__caption__content__list__ul">
                                ${newIngredientTag}
                            </ul>
                        </div>
                        <div class="main__container-card__figure__caption__content__text">
                            <p>${recipe.description}</p>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </a>
        `;
  });
  containerCards.innerHTML = newRecipeCard;
}

function noMatch(value, matches, number) {
  if (value.length < number) {
    return null;
  } else {
    if (matches.length === 0) {
      containerCards.innerHTML = "";
    }
  }
}

function renderAllArraySFiltred(ArrayFiltred) {
  return renderRecipesCards(ArrayFiltred);
}

function normalizeElement(element) {
  return element
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function requestBySearchBar(searchText) {
  if (searchText.length >= 3) {
    filterCards = allRecipes.filter((recipe) => {
      const regex = new RegExp(normalizeElement(searchText));
      const recipeName = normalizeElement(recipe.name);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        normalizeElement(ingredient.ingredient).match(regex)
      );

      return (
        recipeName.match(regex) ||
        ingredientsMatch ||
        normalizeElement(recipe.description).match(regex)
      );
    });

    noMatch(searchText, filterCards, 3);
    renderAllArraySFiltred(filterCards);
  } else {
    renderAllArraySFiltred(allRecipes);
  }
}

const init = function () {
  renderRecipesCards(allRecipes);
  searchBar.value = "";
};
init();

searchBar.addEventListener("input", function () {
  requestBySearchBar(searchBar.value);
});
