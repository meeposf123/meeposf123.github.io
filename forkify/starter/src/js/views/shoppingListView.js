export const addShoppingListToCart = (recipe, DOMstrings) => {
  recipe.newIngredients.forEach((item, i) => {
    const html = `
    <li class="shopping__item">
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="1">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>`;
    DOMstrings.shopping__list.insertAdjacentHTML('beforeend', html);
  });
}

export const deleteItem = (event) => {
  if(event.target.matches('.shopping__delete, .shopping__delete *')){
    const btn = event.target.closest('.shopping__item');
    btn.parentElement.removeChild(btn);
  }
}
