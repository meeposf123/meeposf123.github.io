// Global app controller
import { Search } from './models/Search.js'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as likeView from './views/likeView'
import * as shoppingListView from './views/shoppingListView'
import { makeSingleRecipe } from './models/makeSingleRecipe'
class Controller{
  constructor (){

    this.likedRecipe = [];
    this.restoreLikes();
    // LikedRecipeObjects
    // elemetns
    this.DOMstrings = {
      search: document.querySelector('.search'),
      search__field: document.querySelector('.search__field'),
      results__list: document.querySelector('.results__list'),
      results__pages: document.querySelector('.results__pages'),
      recipe: document.querySelector('.recipe'),
      recipe__ingredients: document.querySelector('.recipe__ingredients'),
      shopping__list: document.querySelector('.shopping__list'),
      likes__list: document.querySelector('.likes__list')
    }
  }
  listenForSearch(){
    this.DOMstrings.search.addEventListener('submit', (e) => {
      e.preventDefault();
      searchView.displayLoadingSpinner(this.DOMstrings.results__list);
      let query = this.DOMstrings.search__field.value;
      this.search = new Search(query);
      this.search.performSearch()
      .then(() => {
        const recipes = this.search.getRecipes();
        searchView.displayRecipes(recipes, this.DOMstrings);
        searchView.displayNextPageOrPerviousPageIcon(1, Math.ceil(recipes.length/10), this.DOMstrings);
      }).catch(error => {
        alert(error);
      });
    });
  }
  changePage(){
    this.DOMstrings.results__pages.addEventListener('click', (event) => {
      const btn = event.target.closest('.btn-inline');
      if (btn) {
        const recipes = this.search.getRecipes();
        const page = parseInt(btn.dataset.page, 10);
        searchView.displayRecipes(recipes, this.DOMstrings, (page - 1) * 10);
        searchView.displayNextPageOrPerviousPageIcon(page, Math.ceil(recipes.length/10), this.DOMstrings);
    }
    });
  }
  async showRecipeDetails(){
    if(window.location.hash){
      let recipe = await this.getRecipe();
  recipe.getRecipeDetails().then(() => {
  recipeView.displayRecipe(recipe, this.DOMstrings);
  });
  }
  //let temp = this.updateServingsAndIngredients.bind(null, recipe);
  //this.DOMstrings.recipe.addEventListener('click', temp);
  }

  async getRecipe(){
      let recipe;
      if(window.location.hash){
        const id = window.location.hash.replace('#', '');
        recipe = this.likedRecipe.find((curr) => curr.id === id);
        if(recipe !== undefined){
        return recipe;
        }
        if(this.search !== undefined){
        const recipes = this.search.getRecipes();
        recipe = recipes.find((curr) => curr.id === id);
    }
    else if(this.singleRecipe !== undefined && recipe === undefined){
      recipe = this.singleRecipe;
    }
    if(recipe === undefined){
        recipe = await makeSingleRecipe(id);
        this.singleRecipe = recipe;
    }
    return recipe;
    }
    return null;
    }
   addListenerToRecipe(){
    this.DOMstrings.recipe.addEventListener('click', e => {
      (async () => {
        let recipe = await this.getRecipe();
        if(recipe.newIngredients === undefined) {
              await recipe.getRecipeDetails();
        }
        if(e.target.matches('.btn-decrease, .btn-decrease *')){
          recipe.updateServingsIngredients("dec");
          recipeView.displayRecipe(recipe, this.DOMstrings);
        }else if(e.target.matches('.btn-increase, .btn-increase *')){
          recipe.updateServingsIngredients("inc");
          recipeView.displayRecipe(recipe, this.DOMstrings);
        }else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
            shoppingListView.addShoppingListToCart(recipe, this.DOMstrings);

        } else if (e.target.matches('.recipe__love, .recipe__love *')) {
            // Like controller
            if(!recipe.isLiked)
            this.likedRecipe.push(recipe);
            else{
              const index = this.likedRecipe.indexOf(recipe);
              if (index > -1) {
                this.likedRecipe.splice(index, 1);
              }
            //this.singleRecipe = recipe;
            }
            likeView.controlLike(recipe, this.DOMstrings.likes__list);
            likeView.toggleLikeBtn(recipe.isLiked);
            localStorage.setItem('likedRecipe', JSON.stringify(this.likedRecipe));
        }
      })();
    });
    this.DOMstrings.shopping__list.addEventListener('click', (e) => {
      shoppingListView.deleteItem(e);
    });
  }
  restoreLikes(){
    const storage = JSON.parse(localStorage.getItem('likedRecipe'));
    if (storage) {
      storage.forEach((item, i) => {
        makeSingleRecipe(item.id).then(recipe => {
          this.likedRecipe.push(recipe);
          likeView.controlLike(recipe, this.DOMstrings.likes__list);
        });
      });
    }
  }
}

let con = new Controller();
con.listenForSearch();
con.changePage();
const makeBindMethod = con.showRecipeDetails.bind(con);
['hashchange', 'load'].forEach(function (event) { window.addEventListener(event, makeBindMethod)});
con.addListenerToRecipe();
// ['hashchange', 'load'].forEach(function (event) { window.addEventListener(event, () => {
//   con.showRecipeDetails();
// })});
