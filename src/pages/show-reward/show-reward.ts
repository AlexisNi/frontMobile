import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Arena } from "../../providers/arena";
import { ArenaCorrect } from "../../models/arenaCorrect";
import { PlayerResult } from "../../models/playerResult";
import { Sockets } from "../../providers/sockets";

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
  arenInfo: ArenaCorrect;
  playerResult: PlayerResult
  userId;
  arenaId;
  showModal = false;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public arenaService: Arena,
    public socketService: Sockets,
    private alertCtrl: AlertController
  ) {

    /*    this.arenInfo.arenaId = this.params.get('arenaId');
        this.arenInfo.userId = this.params.get('userId');*/
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.showModal = true;



    }, 50);
    this.arenaId = this.params.get('arenaId');
    this.userId = this.params.get('userId');
    this.arenInfo = new ArenaCorrect(this.userId, this.arenaId);

    this.arenaService.getResult(this.arenInfo)
      .subscribe(
      (playerResult: PlayerResult) => {
        this.playerResult = playerResult;
        console.log(playerResult);

      }, error => {

        console.log(error)
      });
  }

  dismiss() {
    console.log(this.viewCtrl);
    this.viewCtrl.dismiss();
  }
  claimAward() {
    console.log('claim');
    this.arenInfo = new ArenaCorrect(this.userId, this.arenaId);
    this.arenaService.getAward(this.arenInfo)
      .subscribe((message) => {
        console.log(message)
        setTimeout(() => {
          console.log('inside')
          this.socketService.reqArenas(this.userId);
          this.socketService.reqStats(this.userId);
          this.dismiss();
        }, 1000);

      }, error => {
        this.dismiss();
        this.presentAlert(error);
      });

  }

  presentAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
