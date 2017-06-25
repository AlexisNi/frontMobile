import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MyProfilePage } from "../my-profile/my-profile";
import { MyArenasPage } from "../my-arenas/my-arenas";
import { Arenas } from "../../models/arenas";
import { Sockets } from "../../providers/sockets";
import { StartingPage } from "../../providers/starting-page";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  arenas: Arenas[] = [];
  startingPage = MyProfilePage;
  arenaPage = MyArenasPage;
  loading: any;
  nots = 0;
  tab=0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socketService: Sockets,
    public stSer: StartingPage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public firebasaService: FirebaseServiceProvider,
    public zone: NgZone) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }


  ngOnInit() {
    this.tab=this.navParams.get('index') || 0;
    this.showLoader();
    this.stSer.newArena
      .subscribe(
      (arena: Arenas) => {
        this.arenas.push(arena);
      });
    setTimeout(() => {
      this.getArenaUpdate();
      this.getOneArena();
    }, 2000);

  }
 
  getOneArena() {
    this.socketService.getOneArena()
      .subscribe((data: Arenas) => {
        this.zone.run(() => this.findArena(data));
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  findArena(arena) {
    for (let i in this.arenas) {
      if (this.arenas[i].arenaId == arena.arenaId) {
        this.arenas[i] = arena;
        this.arenas[i].user_played = true;
        this.arenas[i].invite_played = true;
        this.setBages(this.arenas);
        return true;
      }
    }
    this.arenas.push(arena);
    this.stSer.sendArenas(this.arenas);
    this.setBages(this.arenas);


  }

  getArenaUpdate() {
    this.socketService.reqArenas(this.firebasaService.userId);
    this.socketService.getArenas().subscribe(
      (arena: Arenas[]) => {
        console.log(arena)
        this.zone.run(() => this.setArenas(arena))
        this.loading.dismiss();
      }, error => {
        this.loading.dismiss();
        console.log(error);
        this.presentAlert(error);
      });
  }

  setArenas(arena) {
    this.setBages(arena);
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
    this.stSer.sendArenas(this.arenas);
  }
  setBages(arena) {
    this.nots = 0;
    let userid = this.firebasaService.userId;
    for (let i in arena) {
      if (arena[i].inviteId == userid && arena[i].invite_played == false
        || arena[i].userId == userid && arena[i].user_played == false || arena[i].user_played == true && arena[i].invite_played == true) {
        this.nots = this.nots + 1;
      }
    }
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
