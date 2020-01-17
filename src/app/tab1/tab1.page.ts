import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  providerFb: firebase.auth.FacebookAuthProvider;
  dataUser = {
    email: '',
    password: ''
  };
  connected: boolean;
  userId: string;
  mail: string;
  method: any;
  afDG: any;

  constructor(
    public toastController: ToastController,
    public afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    private fb: Facebook,
    public platform: Platform
  )
   {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log('connecté: ' + auth.uid);
        this.connected = true;
        this.userId = auth.uid;
        this.mail = auth.email;
        this.method = auth.providerData[0].providerId;
      }
    });
  }

  // =========Affichage WebApp IONIC || Web Naviguateur Cordova============================== //
  facebookLogin() {
    if (this.platform.is('cordova')) {
      console.log('PLateforme cordova');
      this.facebookCordova();
    } else {
      console.log('PLateforme Web');
      this.facebookWeb();
    }
}
// =========Affichage WebApp IONIC || Web Naviguateur Cordova============================== //

// =========Fonction d'inscription FaceBook sur App=================================================================//
facebookCordova() {
  this.fb.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
          console.log('Info Facebook: ' + JSON.stringify(success));
          this.afDB.object('utilisateurs/' + success.user.uid).set({
            displayName: success.user.displayName,
            photoURL: success.user.photoURL
          });
      }).catch((error) => {
          console.log('Erreur: ' + JSON.stringify(error));
      });
  }).catch((error) => { console.log(error); });
}
// ==========================================================================//

// ================Fonction d'inscription sur Le Browser==========================================================//
facebookWeb() {
  this.afAuth.auth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((success) => {
      console.log('Info Facebook: ' + JSON.stringify(success));
      console.log('DisplayName: ' + success.user.displayName);
      console.log('UserID: ' + success.user.uid);
      console.log('photoURL: ' + success.user.photoURL);
      this.afDB.object('utilisateurs/' + success.user.uid).set({
        displayName: success.user.displayName,
        photoURL: success.user.photoURL
      });
    }).catch((error) => {
      console.log('Erreur: ' + JSON.stringify(error));
    });
}
// ==========================================================================//

// ==========================================================================//
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
    .then(() => {
      console.log('Connexion réussie');
      this.loginSuccess();
      this.dataUser = {
        email: '',
        password: ''
      };
    }).catch(err => {
      this.loginError();
      console.log('Erreur: ' + err);
    });
  }
// ==========================================================================//


// ==========================================================================//
  signUp() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
    .then(() => {
      console.log('Connexion réussie');
      this.dataUser = {
        email: '',
        password: ''
      };
      this.loginSuccess();
    }).catch(err => {
      this.loginError();
      console.log('Erreur: ' + err);
    });
  }
// ==========================================================================//

// ==========================================================================//
  logout() {
    this.afAuth.auth.signOut();
  }

  async loginError() {
    const toast = await this.toastController.create({
      message: 'Adresse email ou mot de passe incorrect.',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
// ==========================================================================//

// ==========================================================================//
  async loginSuccess() {
    const toast = await this.toastController.create({
      message: 'Vous êtes maintenant connecté.',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  // ==========================================================================//

  // ==========================================================================//
  add() {
    this.afDG.list('User/').push({
      pseudo: 'drissas'
    });
  }

}
// ==========================================================================//