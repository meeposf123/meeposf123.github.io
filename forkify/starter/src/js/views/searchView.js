export let displayRecipes = (recipes, DOMstrings, index = 0) => {
  DOMstrings.results__list.innerHTML = '';
  recipes.slice(index, index + 10).forEach(curr => {
    let html = `
    <li>
        <a class="results__link" href="#%id%">
            <figure class="results__fig">
                <img src="%image_url%" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">%recipe_name%</h4>
                <p class="results__author">%recipe_author%</p>
            </div>
        </a>
    </li>`;

    html = html.replace('%id%', curr.id);
    html = html.replace('%image_url%', curr.image_url);
    html = html.replace('%recipe_author%', curr.publisher);
    let name = curr.transformedTitle === undefined ? curr.title : curr.transformedTitle;
    html = html.replace('%recipe_name%', name);
    DOMstrings.results__list.insertAdjacentHTML('beforeend', html);
  });

}

export let displayNextPageOrPerviousPageIcon = (currentPage, totalPage, DOMstrings) => {
  DOMstrings.results__pages.innerHTML = '';
  if(currentPage === 1){
    let html = `
    <button class="btn-inline results__btn--next" data-page="${currentPage + 1}">
        <span>Page 2</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </button>`;
    DOMstrings.results__pages.insertAdjacentHTML('beforeend', html);
  }else if(currentPage < totalPage){
    let html = `
    <button class="btn-inline results__btn--next" data-page="${currentPage + 1}">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </button>`;
    DOMstrings.results__pages.insertAdjacentHTML('beforeend', html);

    html = `
    <button class="btn-inline results__btn--prev" data-page="${currentPage - 1}">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>`;
    DOMstrings.results__pages.insertAdjacentHTML('afterbegin', html);
  }else if(currentPage === totalPage){
    let html = `
    <button class="btn-inline results__btn--prev" data-page="${currentPage - 1}">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>`;
    DOMstrings.results__pages.insertAdjacentHTML('afterbegin', html);
  }
}

export let displayLoadingSpinner = (DOMstring) => {
  DOMstring.innerHTML = '';
  let html = `
  <div class="loader">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `;
  DOMstring.insertAdjacentHTML('beforeend', html);
}
