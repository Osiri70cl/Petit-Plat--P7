export function generateRecipeHTML(recipe) {
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
