import { Component, OnInit } from '@angular/core';
import { Arenas } from "../../models/arenas";
import { Sockets } from "../../providers/sockets";
import { Auth } from "../../providers/auth";
import { StartingPage } from "../../providers/starting-page";

/*
  Generated class for the GameList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'game-list',
  templateUrl: 'game-list.html'
})
export class GameListComponent implements OnInit {
  arenas: Arenas[];
  constructor(public socketService: Sockets,
    public authService: Auth,
    public startingPage: StartingPage) {
  }
  ngOnInit() {
    this.startingPage.newArena
      .subscribe(
        (arena:Arenas)=>{
          console.log(arena);
          this.arenas.push(arena);

        }
        )
    this.socketService.reqArenas(this.authService.userId);
    this.getArenaUpdate();
    this
  }

  getArenaUpdate() {
    this.socketService.getArenas().subscribe(
      (arena: Arenas[]) => {

        this.arenas = arena;
      /*  console.log(arena);*/
      });
  }

}
