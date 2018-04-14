import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit () {
    const config = {
      apiKey: "AIzaSyAvscPiFA8ezzeBOGt449pJpV6ALanpDHc",
      authDomain: "ng-recipe-book-63d1a.firebaseapp.com"
    };
    firebase.initializeApp(config);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
