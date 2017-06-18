import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App, ModalController } from 'ionic-angular';
import { SigninPage } from "../signin/signin";
import { ArenaPlayers } from "../../models/arenaPlayers";
import { UserFound } from "../starting-page/userFound";
import { Stats } from "../../models/stats";
import { Sockets } from "../../providers/sockets";
import { StartingPage } from "../../providers/starting-page";
import { Auth } from "../../providers/auth";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { CreateUserModalPage } from "../create-user-modal/create-user-modal";
import { NotificationEventResponse } from "@ionic-native/push";
import { MatchPage } from "../match/match";
import { PlayWithChosenUserPage } from "../play-with-chosen-user/play-with-chosen-user";

/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {
  firebaseService: any;
  public experienceNextLevel = 0;
  public currentExp = 0;
  public percentage = 0;
  public level = 1;
  loading: any;
  hideStartingPage = false;
  hideArenas = true;
  stats: Stats;
  pageView = 1;
  wins;
  loses;
  draws;
  pWins;
  pLoses;
  pDraws;
  findPlayerPage: any = 'PlayWithChosenUserPage';
  sWins;
  sLoses;
  sDraws;


  ngOnInit(): void {
    if (this.firebasaService.userId) {
    /* this.notifcationHandler();*/


/*      this.socketService.connect();
*/      this.socketService.reqStats(this.firebasaService.userId);
      this.loadStats();
    }
  }



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public socketService: Sockets,
    private startPageService: StartingPage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firebasaService: FirebaseServiceProvider,
    public zone: NgZone,
    public appCtrl: App,
    private modalCtrl: ModalController) { }

  loadStats() {
    this.socketService.getStats()
      .subscribe((stats: Stats) => {
        this.zone.run(() => this.setStats(stats))
      })
  }
  setStats(stats) {

    this.level = stats.level;
    this.wins = stats.wins;
    this.loses = stats.loses;
    this.draws = stats.draws;
    let sum = this.wins + this.loses + this.draws;
    this.pWins = ((this.wins / sum) * 100) + 10;
    this.pLoses = ((this.loses / sum) * 100) + 10;
    this.pDraws = ((this.draws / sum) * 100) + 10;
    this.pWins = this.pWins.toFixed(1);
    this.pLoses = this.pLoses.toFixed(1);
    this.pDraws = this.pDraws.toFixed(1);
    if (this.pWins == 'NaN') {
      this.pWins = 0;
      this.sWins = 0;
    } else {
      this.sWins = this.pWins - 10;
    }
    if (this.pLoses == 'NaN') {
      this.pLoses = 0;
      this.sLoses = 0;
    } else {
      this.sLoses = this.pLoses - 10;
    }
    if (this.pDraws == 'NaN') {
      this.pDraws = 0;
      this.sDraws = 0;
    } else {
      this.sDraws = this.pDraws - 10;
    }
    this.currentExp = stats.currentExp;
    this.experienceNextLevel = 300 * stats.level;
    this.percentage = (this.currentExp / this.experienceNextLevel) * 100;
  }

  findUser(userName) {
    this.showLoader();
    this.startPageService.findUser({ username: userName }).then((result: UserFound) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: result.message,
        message: result.userName,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Play with ' + userName,
            handler: () => {
              const arenaPlayer = new ArenaPlayers(this.firebasaService.userId, result.inviteId);
              this.startPageService.createArena(arenaPlayer)
                .subscribe(data => {
                  this.appCtrl.getRootNav().push(MatchPage, { arena: data });
                }, err => { this.presentAlert(err.message); console.log(err) });



            }
          }
        ]
      });
      alert.present();

    }, (err) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: err.json().title,
        message: err.json().message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
      console.log(err.json());
    });

  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'please wait...'
    });

    this.loading.present();
  }
  logout() {
    this.firebasaService.signOut();
    setTimeout(() => {
      this.appCtrl.getRootNav().push(SigninPage);
    }, 1000);
  }
  showArenas() {
    this.hideArenas = false;
    this.hideStartingPage = true;
  }

  presentAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  notifcationHandler() {
    this.firebasaService.initPushNotification().on('registration')
      .subscribe((data: any) => {
        console.log(data.registrationId);
        this.firebasaService.sendDeviceToken(data.registrationId).subscribe(data => {
        }, error => { console.log(error) })
      });
    this.firebasaService.initPushNotification()
      .on('notification').subscribe((response: NotificationEventResponse) => {
        console.log('message', response.message);
        console.log(response);
        if (response.additionalData.foreground) {
          console.log('message', response.message);
          let confirmAlert = this.alertCtrl.create({
            title: 'New Notification',
            message: response.message,
            buttons: [{
              text: 'Ok',
              role: 'cancel'
            }, {
              text: 'Go to arenas',
              handler: () => {
                //TODO: Your logic here
              }
            }]
          });
          confirmAlert.present();
        } else {


          console.log("Push notification clicked");
        }
      });



  }

  choosePlayer() {
    let modal = this.modalCtrl.create(this.findPlayerPage, {});
    modal.present();
  }


}
