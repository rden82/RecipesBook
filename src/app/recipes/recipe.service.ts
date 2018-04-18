import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredients.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply Test',
      'https://www.mojosavings.com/wp-content/uploads/2014/05/sloppyjoe.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('French Fries', 10)
      ]),
    new Recipe(
      'Another Test Recipe',
      'This is not simply Test',
      'https://i.ytimg.com/vi/J_1RukOKdCg/maxresdefault.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Bread', 2)
      ]),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }
  saveRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe (recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe (index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
