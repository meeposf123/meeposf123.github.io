import { Recipe } from './Recipe'
import axios from 'axios'
export let makeSingleRecipe = async function makeSingleRecipe(id){
  let response = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  let recipe = new Recipe(response.data.recipe.recipe_id, response.data.recipe.publisher, response.data.recipe.image_url, response.data.recipe.source_url, response.data.recipe.title);
  recipe.ingredients = response.data.recipe.ingredients;
  recipe.transformIngredients();
  recipe.calcTime();
  return recipe;
}
