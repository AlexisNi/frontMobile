import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Platform, Nav, AlertController, IonicApp } from 'ionic-angular';
import { StatusBar, Splashscreen, Geolocation } from 'ionic-native';
import { FirebaseServiceProvider } from "../providers/firebase-service/firebase-service";
import { Subscription } from "rxjs/Subscription";
import { Sockets } from "../providers/sockets";




@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {
  signinSubscription: Subscription;

  ngOnInit(): void {


  }
  rootPage: any = 'SigninPage';
  @ViewChild(Nav) nav: Nav;




  constructor(
    public platform: Platform,
    public alertCtrl: AlertController,
    public firebasaService: FirebaseServiceProvider,
    private ionicApp: IonicApp,
    public socketService: Sockets) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /*      let activePortal =
              this.ionicApp._modalPortal.getActive();
             
      
            if (activePortal) {
              activePortal.dismiss();
              return;
            }*/

      this.platform.registerBackButtonAction(() => {
        let alert = this.alertCtrl.create({
          message: 'Αre you sure want to close the app?',
          buttons: [
            {
              text: 'Cancel',
              handler: () => {

              }
            },
            {
              text: 'Yes',
              handler: () => {
                this.platform.exitApp();
              }
            }
          ]
        })
        alert.present();


      });
      StatusBar.styleLightContent();
      StatusBar.hide();
      Splashscreen.hide();
    });
  }







}
