import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, Geolocation } from 'ionic-native';
import { Push, PushObject, PushOptions } from "@ionic-native/push";

import { SigninPage } from "../pages/signin/signin";
import { TabsPage } from "../pages/tabs/tabs";



@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  ngOnInit(): void {


  }
  rootPage: any = SigninPage;
  @ViewChild(Nav) nav: Nav;




  constructor(
    public platform: Platform,
    public push: Push,
    public alertCtrl: AlertController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
