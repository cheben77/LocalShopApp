import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { Facebook } from '@ionic-native/facebook/ngx';


import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { QRCodeModule } from 'angularx-qrcode';


import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyDae4oOQh9G4dmSrE6nuz4obGLzxa-aUfw',
  authDomain: 'localshop2.firebaseapp.com',
  databaseURL: 'https://localshop2.firebaseio.com',
  projectId: 'localshop2',
  storageBucket: 'localshop2.appspot.com',
  messagingSenderId: '395731779482',
  appId: '1:395731779482:web:ef5f925bceefae652e0423',
  measurementId: 'G-2KHJYBPB7N'
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    QRCodeModule

  ],

  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
