import { recipes } from "./api/recipes.js";

const searchInput = document.querySelector('#search-bar');
const recipeList = document.querySelector('#recipes-container');

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




function searchRecipes(query) {
  return recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(query.toLowerCase()) ||
           recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()));
  });
}

searchInput.addEventListener('input', event => {
  const query = event.target.value;
  const filteredRecipes = searchRecipes(query);
  
  recipeList.innerHTML = '';
  filteredRecipes.forEach(recipe => {
    const recipeElement = document.createElement('li');
    recipeElement.innerHTML = generateRecipeHTML(recipe);
    recipeList.appendChild(recipeElement);
  });
});



recipes.forEach((recipe) => {
  const recipeHTML = generateRecipeHTML(recipe);
  recipeList.insertAdjacentHTML('beforeend', recipeHTML);
});