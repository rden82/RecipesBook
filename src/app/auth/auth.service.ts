import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  token  = null;
  userEmail = '';

  constructor (private router: Router) {}

  signupUser(email:string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        console.log('User created');
        this.signinUser(email, password);
      }
    ).catch(
        error => {
          console.log(error);
          alert(error.message);
        }
      );
  }
  signinUser(email:string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken().then(
          token => this.token = token
        );
        this.userEmail = firebase.auth().currentUser.email;
      }
    ).catch(
      error => {
        console.log(error);
        alert(error.message)
      }
    );
  }
  signOutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }
  getToken() {
    firebase.auth().currentUser.getToken().then(
      token => this.token = token
    );
    return this.token;
  }
  isAuthenticated() {
    return (this.token != null);
  }
}
