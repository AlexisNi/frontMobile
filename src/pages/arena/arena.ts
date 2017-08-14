import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Arena} from "../../providers/arena";

/*
  Generated class for the Arena page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-arena',
  templateUrl: 'arena.html'
})
export class ArenaPage {
  loading:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private arenaServcie:Arena,
              public loadingCtrl: LoadingController,) {}

  ionViewDidLoad() {

  }



}
