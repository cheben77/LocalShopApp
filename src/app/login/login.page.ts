import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { initializeApp } from 'firebase';

import { ToastController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';

const loginData = {
  email: '',
  password: ''
};


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData: any;
  constructor(
    public toastController: ToastController,
    public afAuth: AngularFireAuth
  ) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
    .then(auth => {
      console.log('utilisateur connecté');
    })
    .catch(err => {
      console.log('Erreur: ' + err);
      this.errorMail();
    });
  }

  async errorMail() {
    const toast = await this.toastController.create({
      message: 'Email ou mot de passe incorrect',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  signUp() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.loginData.email, this.loginData.password)
    .then(auth => {
      console.log('utilisateur connecté');
    })
    .catch(err => {
      console.log('Erreur: ' + err);
      this.errorMail();
    });
  }
}
