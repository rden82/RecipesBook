import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/add/operator/map';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class DataStorageService {
  urlDataBase = 'https://ng-recipe-book-63d1a.firebaseio.com/racipes.json';

  constructor (private httpClient: HttpClient,
               private recipeService: RecipeService,
               private authService: AuthService,
               private roter: Router) {
    }
  storeRecipes() {
    const token = this.authService.getToken();
    if (token) {
      return this.httpClient.put(this.urlDataBase + '?auth=' + token, this.recipeService.getRecipes());
    } else {
      this.roter.navigate(['/signin']);
    }
  }
  getRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.get(this.urlDataBase + '?auth=' + token)
      .map(
        (response) => {
          const recipes: Recipe[]  = <Recipe[]>response;
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
              console.log(recipe) ;
            }
          }
          return recipes;
        }
      );
  }
}
