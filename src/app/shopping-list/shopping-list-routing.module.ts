import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list.component';
import {AuthGuard} from '../auth/auth-guard.service';

const shoppingRoutes: Routes = [
  {path: '', component: ShoppingListComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [
    RouterModule.forChild(shoppingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule {

}
