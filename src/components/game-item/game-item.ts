import { Component, Input, OnChanges, SimpleChange, OnInit } from '@angular/core';
import { Arenas } from "../../models/arenas";
import { NavController, NavParams, App, ModalController } from "ionic-angular";
import { MatchPage } from "../../pages/match/match";
import { Auth } from "../../providers/auth";
import { Questions } from "../../providers/questions";
import { ArenaCorrect } from "../../models/arenaCorrect";
import { ShowRewardPage } from "../../pages/show-reward/show-reward";

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
  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.arenaInfo = new ArenaCorrect(this.userId, this.arena.arenaId);
    setTimeout(() => {
      if (this.arena.user_played == true || this.arena.invite_played == true) {
        this.questionService.getCorrectNumber(this.arenaInfo).subscribe(data => this.correctNumber = data.correct);
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
    public authService: Auth,
    public questionService: Questions,
    public modalCtrl: ModalController ) {


  }
  playMatch(arena: Arenas) {
    if (arena.user_played == true && arena.userId == this.userId) {
      console.log('you already played');

    } else {
      this.appCtrl.getRootNav().push(MatchPage, { arena: arena });

    }

  }
  getReward(){
     let modal = this.modalCtrl.create(ShowRewardPage,{charNum: 0});
    modal.present();
  }

}
