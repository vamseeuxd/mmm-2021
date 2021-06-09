import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public auth: AngularFireAuth,
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/dashboard');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async loginWithGoogle() {
    await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
}
