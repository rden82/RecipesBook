import {Component, OnDestroy} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Ingredient} from '../shared/ingredients.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  subscription: Subscription;
  constructor (private dataStorageService: DataStorageService,
               private recipeService: RecipeService,
               private shoppingListService: ShoppingListService,
               private authService: AuthService) {}
  onSaveServers() {
    this.subscription = this.dataStorageService.setRecipesBook().subscribe(
      (response) => { console.log(response); },
      (error) => { console.log(error); }
    );
  }
  onGetServers() {
    this.subscription = this.dataStorageService.getRecipesBook().subscribe(
      (response) => {
        this.recipeService.saveRecipes(<Recipe[]>response[0]);
        this.shoppingListService.setIngredients(<Ingredient[]>response[1])
        },
      (error) => { console.log(error); }
    )
  }
  onLogout() {
    this.authService.signOutUser();
  }
  ngOnDestroy () {
    this.subscription.unsubscribe()
  }
}

