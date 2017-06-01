import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { SigninPage } from "../signin/signin";
import { ArenaPlayers } from "../../models/arenaPlayers";
import { UserFound } from "../starting-page/userFound";
import { Stats } from "../../models/stats";
import { Sockets } from "../../providers/sockets";
import { StartingPage } from "../../providers/starting-page";
import { Auth } from "../../providers/auth";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

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
  public experienceNextLevel = 0;
  public currentExp = 0;
  public percentage = 0;
  public level = 1;


  ngOnInit(): void {
    this.socketService.connect();
    if (this.firebasaService.userId) {
      console.log(this.firebasaService.userId);
      this.socketService.reqStats(this.firebasaService.userId);
      this.loadStats();
    }

  }

  loading: any;
  hideStartingPage = false;
  hideArenas = true;
  stats: Stats;
  pageView = 1;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public socketService: Sockets,
    private startPageService: StartingPage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: Auth,
    public firebasaService: FirebaseServiceProvider,
    public zone: NgZone,
    public appCtrl: App) { }


  loadStats() {
    this.socketService.getStats()
      .subscribe((stats: Stats) => {
        this.zone.run(() => this.setStats(stats))
      })
  }
  setStats(stats) {
    console.log(stats);
    console.log(stats.level)
    this.level = stats.level;
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
              const arenaPlayer = new ArenaPlayers(this.authService.userId, result.inviteId);
              this.startPageService.createArena(arenaPlayer)
                .subscribe(data => {
                  setTimeout(() => {
                    this.socketService.reqArenas(result.inviteId);
                  }, 1200);
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
      content: 'Authenticating...'
    });

    this.loading.present();

  }
  logout() {
    this.authService.logout();
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




}
