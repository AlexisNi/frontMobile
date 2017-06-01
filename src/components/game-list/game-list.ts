import { Component, OnInit } from '@angular/core';
import { Arenas } from "../../models/arenas";
import { Sockets } from "../../providers/sockets";
import { Auth } from "../../providers/auth";
import { StartingPage } from "../../providers/starting-page";
import { LoadingController, AlertController } from "ionic-angular";

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
    public authService: Auth,
    public startingPage: StartingPage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }
  ngOnInit() {
    this.showLoader();

    setTimeout(() => {
      this.startingPage.newArena
        .subscribe(
        (arena: Arenas) => {
          this.arenas.push(arena);
        })
      this.socketService.reqArenas(this.authService.userId);
      this.getArenaUpdate();
    }, 1000);

  }

  getArenaUpdate() {
    console.log('inside get arena');
    this.socketService.getArenas().subscribe(
      (arena: Arenas[]) => {
        console.log('inside get arena');


        this.arenas = arena;
        console.log(arena);
        this.loading.dismiss();

      }, error => {
        this.loading.dismiss();
        console.log(error);
        this.presentAlert(error);
      });
  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
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
