import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/add/operator/map';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Ingredient} from './ingredients.model';

@Injectable()
export class DataStorageService {
  urlDataBase = 'https://ng-recipe-book-63d1a.firebaseio.com/recipes.json';

  constructor (private httpClient: HttpClient,
               private recipeService: RecipeService,
               private shoppingListService: ShoppingListService,
               private authService: AuthService,
               private router: Router) {
    }
  RecipeBooks() {
    return [this.recipeService.getRecipes(), this.shoppingListService.getIngredients()]
  }
  setRecipesBook() {
    const token = this.authService.getToken();
    if (token) {
      return this.httpClient.put(this.urlDataBase + '?auth=' + token, this.RecipeBooks());
    } else {
      this.router.navigate(['/signin']);
    }
  }
  getRecipesBook() {
    const token = this.authService.getToken();
    return this.httpClient.get(this.urlDataBase + '?auth=' + token)
      .map(
        (response) => {
          const book  = response;
          return book;
        }
      );
  }
}
