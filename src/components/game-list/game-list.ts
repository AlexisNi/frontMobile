import { Component, OnInit, NgZone } from '@angular/core';
import { Arenas } from "../../models/arenas";
import { Sockets } from "../../providers/sockets";
import { Auth } from "../../providers/auth";
import { StartingPage } from "../../providers/starting-page";
import { LoadingController, AlertController } from "ionic-angular";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

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
  loading: any;

  constructor(
    public socketService: Sockets,
    public startingPage: StartingPage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public firebasaService: FirebaseServiceProvider,
    public zone: NgZone,
  ) {
  }
  ngOnInit() {
    this.showLoader();


    this.startingPage.newArena
      .subscribe(
      (arena: Arenas) => {
        this.arenas.push(arena);
      });

    this.getArenaUpdate();
    this.getOneArena();




  }
  //edw na valw event emitter poy na elenxei an einai disconnet o user kai an einai na svinei to loading
  getOneArena() {
    this.socketService.getOneArena()
      .subscribe((data: Arenas) => {
        this.zone.run(() => this.findArena(data))
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  findArena(arena) {
    for (let i in this.arenas) {
      if (this.arenas[i].arenaId == arena.arenaId) {
        this.arenas[i] = arena;
        this.arenas[i].user_played=true;
        this.arenas[i].invite_played=true;
        console.log(this.arenas[i]);
        return true;
      }
    }
    this.arenas.push(arena);

  }
  getArenaUpdate() {

    this.socketService.reqArenas(this.firebasaService.userId);
    this.socketService.getArenas().subscribe(
      (arena: Arenas[]) => {
        this.zone.run(() => this.setArenas(arena))
        this.loading.dismiss();
      }, error => {
        this.loading.dismiss();
        console.log(error);
        this.presentAlert(error);
      });
  }
  setArenas(arena) {
    let userid = this.firebasaService.userId;
    for (let i in arena) {
      if (arena[i].inviteId == userid && arena[i].invite_played == false || arena[i].userId == userid && arena[i].user_played == false) {
        arena[i].sort = 1;
      } else {
        arena[i].sort = 0;
      }
    }
    this.arenas = arena.sort(function (a, b) {
      return b.sort - a.sort
    });
  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait loading arenas...'
    });

    this.loading.present();

  }

  presentAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
