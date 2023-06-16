const init = function () {
  renderRecipesCards(allRecipes);
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
