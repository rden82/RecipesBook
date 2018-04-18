import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {ShoppingListService} from '../shopping-list/shopping-list.service';


@Injectable()
export class DataStorageService {
  urlDataBase = 'https://ng-recipe-book-63d1a.firebaseio.com/recipes.json';
  test = null;
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
  //   if (token) {
  //     return this.httpClient.put(this.urlDataBase + '?auth=' + token, this.RecipeBooks(), {
  //       observe: 'body',
  //       headers: new HttpHeaders().set('Authorization', 'sdfsdfsdfsdf')
  //     });
  //   } else {
  //     this.router.navigate(['/signin']);
  //   }
     const req = new HttpRequest('PUT', this.urlDataBase,
       this.RecipeBooks(),{reportProgress: true});
     return this.httpClient.request(req)
   }
  getRecipesBook() {
    return this.httpClient.get(this.urlDataBase, {
      observe: 'body',
      headers: new HttpHeaders().set('Authorization', 'Beare sfsdfsdf'),
      responseType: 'json'
    })
      .map(
        (body) => {
          return body;
        }
      );
  }
}
