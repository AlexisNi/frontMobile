import { Component, OnInit, NgZone, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Arenas } from "../../models/arenas";
import { Sockets } from "../../providers/sockets";
import { Auth } from "../../providers/auth";
import { StartingPage } from "../../providers/starting-page";
import { LoadingController, AlertController } from "ionic-angular";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { Subscription } from "rxjs/Subscription";
import { GameItemComponent } from "../game-item/game-item";

/*
  Generated class for the GameList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'game-list',
  templateUrl: 'game-list.html'
})
export class GameListComponent implements OnInit, OnDestroy {

  arenas: Arenas[];
  loading: any;
  arenasSub: Subscription;
  @ViewChildren(GameItemComponent, { read: ElementRef }) gameItem: QueryList<any>

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
    console.log(this.gameItem);

    this.arenas = this.startingPage.arenas;
    this.arenasSub = this.startingPage.getArenas
      .subscribe((arenas: Arenas[]) => {
        this.arenas = arenas;
      });
  }
  ngAfterViewInit() {
    try {
      this.gameItem.first.nativeElement.children[0].style.marginTop = '1vw';

    }catch (err){
      

    }


  }
  ngOnDestroy(): void {
    try {
      this.arenasSub.unsubscribe();

    } catch (err) {
      console.log(err);
    }

  }

  findArena(arena) {
    for (let i in this.arenas) {
      if (this.arenas[i].arenaId == arena.arenaId) {
        this.arenas[i] = arena;
        this.arenas[i].user_played = true;
        this.arenas[i].invite_played = true;
        console.log(this.arenas[i]);
        return true;
      }
    }
    this.arenas.push(arena);

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
