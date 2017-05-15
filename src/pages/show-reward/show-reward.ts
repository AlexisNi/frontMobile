import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
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

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public arenaService: Arena,
    public socketService:Sockets
  ) {

    /*    this.arenInfo.arenaId = this.params.get('arenaId');
        this.arenInfo.userId = this.params.get('userId');*/
  }

  ionViewDidLoad() {
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
    this.viewCtrl.dismiss();
  }
  claimAward() {
    this.arenInfo = new ArenaCorrect(this.userId, this.arenaId);
    this.arenaService.getAward(this.arenInfo)
      .subscribe((message) => {
        console.log(message)
        setTimeout(() => {
          this.socketService.reqArenas(this.userId);
          this.socketService.reqStats(this.userId);
          this.dismiss()
        }, 300);
       
      });

  }
}
