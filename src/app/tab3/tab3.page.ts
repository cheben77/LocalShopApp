import { Component } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { ActionSheetController, Platform, AlertController } from '@ionic/angular';
import { constructor } from 'firebase';




@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page {
  map: GoogleMap;
  constructor(
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    public platform: Platform
  ) {
    if (this.platform.is('cordova')) {
      this.loadMap();
    }
  }
  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAJjXyc0-8x1DSdbnS0FhnkmskZ5hHvzlQ',
      API_KEY_FOR_BROWSER_DEBUG: ''
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.610769,
          lng: 3.876716
        },
        zoom: 12,
        tilt: 30
      }
    });
  }
  setMapTypeId() {
    this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
  }
  async mapOptions() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Satellite',
        handler: () => {
          console.log('Satellite clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
        }
      }, {
        text: 'Plan',
        handler: () => {
          console.log('Plan clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
        }
      }, {
        text: 'Terrain',
        handler: () => {
          console.log('Terrain clicked');
          this.map.setMapTypeId(GoogleMapsMapTypeId.TERRAIN);
        }
      }, {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  placeMarker(markerTitle: string) {
    const marker: Marker = this.map.addMarkerSync({
       title: markerTitle,
       icon: 'red',
       animation: 'DROP',
       position: this.map.getCameraPosition().target
    });
 }
 async addMarker() {
  const alert = await this.alertController.create({
    header: 'Ajouter un emplacement',
    inputs: [
      {
        name: 'title',
        type: 'text',
        placeholder: 'Le titre'
      }
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ajouter',
        handler: data => {
          console.log('Titre: ' + data.title);
          this.placeMarker(data.title);
        }
      }
    ]
  });
  await alert.present();
}
}
