const init = function () {
  renderRecipesCards(allRecipes);
  renderIngredientsList(allRecipes);
  renderAppliancesList(allRecipes);
  renderUstensilsList(allRecipes);
  searchBar.value = "";
  filteredTagsArr = [];
  tagBgColorArray = [];
  renderFilteredTags();
};
init();

searchBar.addEventListener("click", function () {
  closeAllDropdowns();
  init();
});

searchBar.addEventListener("input", function () {
  requestBySearchBar(searchBar.value);
});

ingredientsSearch.addEventListener("input", function () {
  searchIngredientsList(ingredientsSearch.value);
});

appliancesSearch.addEventListener("input", function () {
  searchAppliancesList(appliancesSearch.value);
});

ustensilsSearch.addEventListener("input", function () {
  searchUstensilsList(ustensilsSearch.value);
});
