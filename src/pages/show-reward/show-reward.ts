import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ShowReward page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-reward',
  templateUrl: 'show-reward.html'
})
export class ShowRewardPage {
 character;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController
  ){}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
