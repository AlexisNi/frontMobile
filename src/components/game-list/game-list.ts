import {Component, OnInit} from '@angular/core';
import {Arenas} from "../../models/arenas";
import {Sockets} from "../../providers/sockets";
import {Auth} from "../../providers/auth";

/*
  Generated class for the GameList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'game-list',
  templateUrl: 'game-list.html'
})
export class GameListComponent implements OnInit{
  arenas:Arenas[];
  constructor(public socketService:Sockets,
              public authService:Auth) {
  }
  ngOnInit() {
    this.socketService.reqArenas(this.authService.userId);
    this.getArenaUpdate();
  }
  ionViewDidEnter(){
        console.log('init')

  }

  getArenaUpdate(){
    this.socketService.getArenas().subscribe(
      (arena:Arenas[])=> {

        this.arenas=arena;
        console.log(arena);
      });
  }

}
