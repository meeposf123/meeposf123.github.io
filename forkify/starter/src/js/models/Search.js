import axios from 'axios';
import { Recipe } from './Recipe'
export class Search{
  constructor (query){
    this.query = query
    this.url = 'https://forkify-api.herokuapp.com/api/search'
  }
  async performSearch(){
    try{
      this.recipes = [];
      let response = await axios(`${this.url}?q=${this.query}`);
      response.data.recipes.forEach((curr) => {
        this.recipes.push(new Recipe(curr.recipe_id, curr.publisher, curr.image_url, curr.source_url, curr.title));
      });
    }catch(error){
      alert(error);
    }
  }
  getRecipes(){
    return this.recipes;
  }
}
