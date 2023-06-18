const searchBar = document.getElementById("search-bar-input");

let filterCardsByInput = [];
let filterFurtherByTags = [];
let filterCardsByTags = [];

let ingredientsListFiltred = [];
let appliancesListFiltred = [];
let ustensilsListFiltred = [];

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
  return (containerCards.innerHTML = ""), renderRecipesCards(ArrayFiltred);
}

function normalizeElement(element) {
  return element
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function requestBySearchBar(searchText) {
  if (searchText.length >= 3) {
    filterCardsByInput = allRecipes.filter((recipe) => {
      const regex = new RegExp(normalizeElement(`${searchText}`));
      let ingredientsArray = [];
      for (let key in recipe.ingredients) {
        let ingredientElts = recipe.ingredients[key].ingredient;
        ingredientsArray.push(ingredientElts);
      }
      return (
        normalizeElement(recipe.name).match(regex) ||
        normalizeElement(`${ingredientsArray}`).match(regex) ||
        normalizeElement(recipe.description).match(regex)
      );
    });
    noMatch(searchText, filterCardsByInput, 3);
    renderAllArraySFiltred(filterCardsByInput);
  } else {
    renderAllArraySFiltred(allRecipes);
  }
}
