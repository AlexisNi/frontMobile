import { Component, Input, OnChanges, SimpleChange, OnInit } from '@angular/core';
import { Arenas } from "../../models/arenas";
import { NavController, NavParams, App, ModalController, AlertController } from "ionic-angular";
import { MatchPage } from "../../pages/match/match";
import { Auth } from "../../providers/auth";
import { Questions } from "../../providers/questions";
import { ArenaCorrect } from "../../models/arenaCorrect";
import { ShowRewardPage } from "../../pages/show-reward/show-reward";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

/*
  Generated class for the GameItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'game-item',
  templateUrl: 'game-item.html'
})
export class GameItemComponent implements OnChanges, OnInit {
  @Input() arena: Arenas;
  private inviteId;
  public userId;
  arenaInfo: ArenaCorrect;
  correctNumber;
  username;
  ngOnInit(): void {
    this.userId = this.firebasaService.userId;
    this.arenaInfo = new ArenaCorrect(this.userId, this.arena.arenaId);
    this.username=this.firebasaService.username;

   setTimeout(() => {
      if (this.arena.user_played == true || this.arena.invite_played == true) {
        this.questionService.getCorrectNumber(this.arenaInfo)
          .subscribe(data => {
            this.correctNumber = data.correct
          }, error => {
            console.log(error)
            this.presentAlert(error);

          });
      }
    }, 50);


  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['arena']) {
      this.arena = changes['arena'].currentValue;

    }
  }




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public questionService: Questions,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public firebasaService: FirebaseServiceProvider) {


  }
  playMatch(arena: Arenas) {
    if (arena.user_played == true && arena.userId == this.userId || arena.invite_played == true && arena.inviteId == this.userId) {
      console.log('you already played');

    } else {

      this.appCtrl.getRootNav().push(MatchPage, { arena: arena });

    }

  }
  getReward() {
    let modal = this.modalCtrl.create(ShowRewardPage, { arenaId: this.arena.arenaId, userId: this.userId });
    modal.present();
  }


  presentAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
