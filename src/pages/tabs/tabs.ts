import { Component, NgZone, OnDestroy } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, IonicPage, Platform } from 'ionic-angular';
import { MyProfilePage } from "../my-profile/my-profile";
import { Arenas } from "../../models/arenas";
import { Sockets } from "../../providers/sockets";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { Arena } from "../../providers/arena";
import { Subscription } from "rxjs/Subscription";
import { StartingPage } from "../../providers/starting-page";

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnDestroy {

  public arenas: Arenas[] = [];
  loading: any;
  connectionLoading: any;
  nots = 0;
  tab = 0;
  startingPage = 'MyProfilePage';
  arenaPage = 'MyArenasPage';
  rewardPage = 'RewardPage';


  allArenasSubscription: Subscription;
  connectSubscription: Subscription;
  oneArenaSubsription: Subscription;
  newArenaSubscruotion: Subscription;




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socketService: Sockets,
    public stSer: StartingPage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public firebasaService: FirebaseServiceProvider,
    public zone: NgZone,
    public arenaService: Arena,
    public platform: Platform

  ) { }

  ionViewDidLoad() {
    try {
/*      this.firebasaService.onNotification();
*/
    } catch (err) {
      console.log(err)
    }

  }
  ngOnDestroy(): void {
    console.log('tabs destroyed')
    this.unsubscribe();
  }


  ngOnInit() {
  /*  this.showLoader();
    this.handleSocketConnections();
    this.tab = this.navParams.get('index') || 0
    this.newArenaSubscruotion = this.stSer.newArena
      .subscribe(
      (arena: Arenas) => {
        this.arenas.push(arena);
      });
    setTimeout(() => {
      this.getAllArenas();
      this.getOneArena();
    }, 2000);
    this.socketService.onMessage().subscribe(data=>{
      console.log(data);
    })*/


  }


  handleSocketConnections() {
    let showLoading = false;
    this.connectSubscription = this.socketService.onConnect().subscribe((data) => {
      setTimeout(() => {
        try {
          this.connectionLoading.dismiss();
          showLoading = false;

        } catch (Err) {

        }
        this.getAllArenas();
        this.getOneArena();
      }, 2000);

    });
    this.socketService.onRecconecting()
      .subscribe(data => {
        if (showLoading == false) {
          showLoading = true;
          this.connectionLoader();
        }


      })
    this.socketService.onRecconectFailed()
      .subscribe(data => {
        try {
          this.connectionLoading.dismiss();
          showLoading = false;
          this.navCtrl.setRoot('SigninPage').then(data => {
            window.location.reload();
          });

        } catch (Err) {

        }
      })

  }


  unsubscribe() {
    try {
      this.allArenasSubscription;
      this.connectSubscription;
      this.oneArenaSubsription;
      this.newArenaSubscruotion;

    } catch (err) {
      console.log(err);
    }
  }
  getOneArena() {
    this.oneArenaSubsription = this.socketService.getOneArena()
      .subscribe((data: Arenas) => {
        this.zone.run(() => this.findArena(data));
        this.zone.run(()=>{this.setArenas(this.arenas)})
      }, error => {
        console.log(error);
      });
  }
  public removeArena(arenaId) {
    for (let i in this.arenas) {
      if (this.arenas[i].arenaId == arenaId) {
        var index = this.arenas.indexOf(this.arenas[i]);
        this.arenas.splice(index, 1);
        this.nots--;
      }
    }
  }

  findArena(arena) {
    for (let i in this.arenas) {
      if (this.arenas[i].arenaId == arena.arenaId) {
        this.arenas[i] = arena;
        this.setBages(this.arenas);
        return true;
      }
    }
    this.arenas.push(arena);
    this.stSer.sendArenas(this.arenas);
    this.setBages(this.arenas);


  }
  getAllArenas() {
    this.allArenasSubscription = this.arenaService.getArenas(this.firebasaService.userId).subscribe((arenas: Arenas) => {
      this.zone.run(() => this.setArenas(arenas))
      this.loading.dismiss();
    }, err => {
      console.log(err);
      this.loading.dismiss();
    })
  }

  setArenas(arena) {
    console.log(arena)
    this.setBages(arena);
    let userid = this.firebasaService.userId;
    for (let i in arena) {
      if (arena[i].inviteId == userid && arena[i].invite_played == false || arena[i].userId == userid && arena[i].user_played == false) {
        arena[i].sort = 1;
      } else if(arena[i].invite_played == true && arena[i].user_played == true) {
        arena[i].sort = 2;
      }else{
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

  connectionLoader() {
    this.connectionLoading = this.loadingCtrl.create({
      content: 'You have been disconnect,attempt to recconect'
    });
    this.connectionLoading.present();

  }

 


}