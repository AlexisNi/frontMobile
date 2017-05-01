import {Component, Input} from '@angular/core';
import {Arenas} from "../../models/arenas";
import {NavController, NavParams} from "ionic-angular";
import {MatchPage} from "../../pages/match/match";

/*
  Generated class for the GameItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'game-item',
  templateUrl: 'game-item.html'
})
export class GameItemComponent {

  @Input() arena:Arenas;
  private inviteId;
  public userId;

  constructor(public navCtrl:NavController , public navParams: NavParams) {

  }
  playMatch(arena){
    this.navCtrl.setRoot(MatchPage,{arena:arena});
  }

}
