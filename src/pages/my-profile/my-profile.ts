import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SigninPage } from "../signin/signin";
import { ArenaPlayers } from "../../models/arenaPlayers";
import { UserFound } from "../starting-page/userFound";
import { Stats } from "../../models/stats";
import { Sockets } from "../../providers/sockets";
import { StartingPage } from "../../providers/starting-page";
import { Auth } from "../../providers/auth";

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


  ngOnInit(): void {
    console.log('starting arena init')
    this.socketService.reqStats(this.authService.userId);
    this.loadStats();

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
    public authService: Auth) { }


  loadStats() {
    this.socketService.getStats()
      .subscribe((stats: Stats) => {
        this.stats = stats;
        console.log(stats);

      })
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
                }, err => { console.log(err) });



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
    this.navCtrl.setRoot(SigninPage);

  }
  showArenas() {
    this.hideArenas = false;
    this.hideStartingPage = true;

  }


}
