import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../recipes/recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  recipiesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://picsum.photos/200',[new Ingredient('ingredient 1', 1),new Ingredient('ingredient 2', 5)]),
  //   new Recipe('Another Test Recipe', 'This is simply a test', 'https://picsum.photos/200',[new Ingredient('ingredient 1', 3),new Ingredient('ingredient 2', 7)])
  // ];

  private recipes: Recipe[] = [];
  
  getRecipes(){
    return this.recipes.slice();
  }
  constructor(private shoppingListService: ShoppingListService) { }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipiesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipiesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number): Recipe{
    return this.recipes[index];
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipiesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipiesChanged.next(this.recipes.slice());
  }
}
