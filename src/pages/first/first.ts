import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Auth} from "../../providers/auth";
import {Arenas} from "../../models/arenas";

/*
  Generated class for the First page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-first',
  templateUrl: 'first.html'
})
export class FirstPage {
  pageView=0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService:Auth) {}

  ionViewDidLoad() {

  }

  goingTo(index){
    this.pageView=index;
  }





}
