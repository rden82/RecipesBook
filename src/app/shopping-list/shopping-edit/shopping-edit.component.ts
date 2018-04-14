import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredients.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  index: number;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService) { }


  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      }
    );
  }
  onSubmit(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex , newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    f.reset();
    this.editMode = false;
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(index: number) {
    this.slService.deleteIngredient(index);
    this.onClear();
  }
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
