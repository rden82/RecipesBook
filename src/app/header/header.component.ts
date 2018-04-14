import {Component, OnDestroy} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  Subscription: Subscription;
  constructor (private dataStorageService: DataStorageService,
               private recipeService: RecipeService,
               private authService: AuthService) {}
  onSaveServers() {
    this.Subscription = this.dataStorageService.storeRecipes().subscribe(
      (response) => { console.log(response); },
      (error) => { console.log(error); }
    );
  }
  onGetServers() {
    this.Subscription = this.dataStorageService.getRecipes().subscribe(
      (response) => {
        this.recipeService.saveRecipes(<Recipe[]>response);
        },
      (error) => { console.log(error); }
    )
  }
  onLogout() {
    this.authService.signOutUser();
  }
  ngOnDestroy () {
    this.Subscription.unsubscribe()
  }
}

