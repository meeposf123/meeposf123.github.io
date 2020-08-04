import axios from 'axios';
export class Recipe{
  constructor(id, publisher, image_url, source_url, title){
    this.id = id;
    this.publisher = publisher;
    this.source_url = source_url;
    this.image_url = image_url;
    this.title = title;
    this.transformTitle();
    this.isLiked = false;
  }
  transformTitle(limit = 17){
    let titleArr = this.title.split(' ');
    titleArr.slice(0).reduce((acc, curr, index, arr) => {
      if(acc + curr.length > limit ){
        this.transformedTitle = titleArr.slice(0, index).join(' ') + '...';
        arr.splice(index - 1);
      }
      return acc + curr.length;
    }, 0);
  }
  calcTime() {
    // Assuming that we need 15 min for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
    }
  async getRecipeDetails(){
    let response = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
    this.ingredients = response.data.recipe.ingredients;
    this.transformIngredients();
    this.calcTime();
  }
  transformIngredients(){
    this.servings = 4;
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];
    this.newIngredients = [];
    this.ingredients.forEach(curr => {
    curr = curr.toLowerCase();
    unitsLong.forEach((current, index) => {
      // Make uniform units
      curr = curr.replace(current, unitsShort[index]);
    });
    // Remove brackets
    curr = curr.replace(/ *\([^)]*\) */g, ' ');

    // Make ingredient objects
    let objIng;
    const arrIng = curr.split(' ');
    const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
    if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
        // Ex. 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
            count = eval(arrIng[0].replace('-', '+'));
        } else {
            count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
            count,
            unit: arrIng[unitIndex],
            ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };

    } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but 1st element is number
        objIng = {
            count: parseInt(arrIng[0], 10),
            unit: '',
            ingredient: arrIng.slice(1).join(' ')
        }
    } else if (unitIndex === -1) {
        // There is NO unit and NO number in 1st position
        objIng = {
            count: 1,
            unit: '',
            ingredient: curr
        }
    }
    this.newIngredients.push(objIng);
  });
  }

  updateServingsIngredients(type){
    // if(this.newIngredients === undefined) {
    //       await this.getRecipeDetails();
    //     }
    if(type == 'inc'){
    this.newIngredients.forEach(curr => {
      curr.count = (curr.count/this.servings) * (this.servings + 1);
    });
    this.servings += 1;
  }else if(type == 'dec' && this.servings > 1){
    this.newIngredients.forEach(curr => {
      curr.count = (curr.count/this.servings) * (this.servings - 1);
    });
    this.servings -= 1;
  }
  }
}
