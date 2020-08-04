export let controlLike = (recipe, element) => {
  if(!recipe.isLiked){
  const markup = `
  <li>
      <a class="likes__link" href="#${recipe.id}">
          <figure class="likes__fig">
              <img src="${recipe.image_url}" alt="Test">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${recipe.transformedTitle === undefined ? recipe.title : recipe.transformedTitle}</h4>
              <p class="likes__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>`;
  recipe.isLiked = true;
  element.insertAdjacentHTML('beforeend', markup);
}else if(recipe.isLiked){
  deleteLike(recipe.id);
  recipe.isLiked = false;
}
}
const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}
export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // icons.svg#icon-heart-outlined
};
