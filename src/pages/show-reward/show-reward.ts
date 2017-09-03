import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Arena } from "../../providers/arena";
import { ArenaCorrect } from "../../models/arenaCorrect";
import { PlayerResult } from "../../models/playerResult";
import { Sockets } from "../../providers/sockets";
<<<<<<< HEAD
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
=======
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76

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
<<<<<<< HEAD
  experience;
  points;
  claimAwardBtn = new Subject<string>();
  awardClicked = false;
=======

  experience;
  points;
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public arenaService: Arena,
    public socketService: Sockets,
    private alertCtrl: AlertController
  ) {
<<<<<<< HEAD
    const observable = this.claimAwardBtn
      .map(value => value)
      .debounceTime(300)
      .flatMap((search) => {
        return Observable.of(search).delay(100);
      })
      .subscribe((data) => {
        if (this.awardClicked == false) {
          this.awardClicked = true;
          this.claimAward();

        }

      });
=======
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76

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

      }, error => {

        console.log(error)
      });
  }

  dismiss(arenaId) {
    console.log(this.viewCtrl);
    this.viewCtrl.dismiss(arenaId);
  }
  claimAward() {
<<<<<<< HEAD
=======
    console.log('claim');
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76
    this.arenInfo = new ArenaCorrect(this.userId, this.arenaId);
    this.arenaService.getAward(this.arenInfo)
      .subscribe((message) => {
        setTimeout(() => {
          console.log('inside')
          this.socketService.reqArenas(this.userId);
          this.socketService.reqStats(this.userId);
<<<<<<< HEAD
          this.dismiss({ arenaId: this.arenaId });
=======
          this.dismiss({arenaId:this.arenaId});
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76
        }, 1000);

      }, error => {
        console.log(error);
<<<<<<< HEAD
        this.dismiss({ arenaId: '' });
=======
        this.dismiss({arenaId:''});
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76
        this.presentAlert(error);
      });
  }

<<<<<<< HEAD
  setAwards(message) {
    this.points = message.drawAward.points;
    this.experience = message.drawAward.experience;
=======
  setAwards(message){
      this.points=message.drawAward.points;
      this.experience=message.drawAward.experience;
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76
  }

  presentAlert(error) {
    let alert = this.alertCtrl.create({
      title: error.message,
<<<<<<< HEAD
      message: error.error,
=======
      message:error.error,
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
