import {Component, OnInit} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,Geolocation } from 'ionic-native';

import {SigninPage} from "../pages/signin/signin";



@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  ngOnInit(): void {


  }
  rootPage:any = SigninPage;



  constructor(platform: Platform) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleLightContent();
      StatusBar.hide();
      console.log(StatusBar);
      Splashscreen.hide();
    });
  }
}
