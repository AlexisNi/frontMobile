import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MyProfilePage} from "../my-profile/my-profile";
import {MyArenasPage} from "../my-arenas/my-arenas";

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');

  }

  startingPage=MyProfilePage;
  arenaPage=MyArenasPage;

}
