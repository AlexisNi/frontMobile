import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, AlertController, ViewController } from 'ionic-angular';
import { StartingPage } from "../../providers/starting-page";
import { ArenaPlayers } from "../../models/arenaPlayers";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { UserFound } from "../starting-page/userFound";
import { MatchPage } from "../match/match";
<<<<<<< HEAD
import { HistoricDataProvider } from "../../providers/historic-data";
=======
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76

/**
 * Generated class for the PlayWithChosenUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-play-with-chosen-user',
  templateUrl: 'play-with-chosen-user.html',
})
export class PlayWithChosenUserPage {
  loading: any;
  hasSearched = false;
  userFound = false;
  wins;
  loses;
  draws;
  level;
  name;
  inviteId;

<<<<<<< HEAD
  randomUser = false;
=======
  randomUser=false;
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    private startPageService: StartingPage,
    public alertCtrl: AlertController,
    public zone: NgZone,
    public firebasaService: FirebaseServiceProvider,
<<<<<<< HEAD
    public viewCtrl: ViewController,
    private historic: HistoricDataProvider
=======
    public viewCtrl: ViewController
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76

  ) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('userFound') != undefined) {
<<<<<<< HEAD
      let userInfo = this.navParams.get('userFound');
=======
      let userInfo=this.navParams.get('userFound');
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76
      console.log(userInfo)
      this.randomUser = true;
      this.userFound = true;
      this.inviteId = userInfo.inviteId;
      this.name = userInfo.userName;
      let userStats = userInfo.stats;
      this.wins = userStats.wins;
      this.loses = userStats.loses;
      this.draws = userStats.draws;
      this.level = userStats.level;
    }

  }

  findUser(userName) {
    this.showLoader();
<<<<<<< HEAD

    this.startPageService.findUser({ username: userName, userId: this.firebasaService.userId }).then((result: UserFound) => {
      this.historic.getHistoricDataVSOpponent({ opponentId: result.inviteId, userId: this.firebasaService.userId }).subscribe(data => {
        data.inviteId = result.inviteId;
        data.userName = result.userName;
        data.level = result.stats.level;
        this.zone.run(() => this.setStats(data));
        this.loading.dismiss();
      });
=======
    this.startPageService.findUser({ username: userName,userId:this.firebasaService.userId }).then((result: UserFound) => {
      this.zone.run(() => this.setStats(result))
      this.loading.dismiss();
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76
    }, (err) => {
      this.userFound = false;
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
  setStats(stats) {
<<<<<<< HEAD
    this.userFound = true;
    this.inviteId = stats.inviteId;
    this.name = stats.userName;
    let userStats = stats.history;
=======
    console.log(stats)
    this.userFound = true;
    this.inviteId = stats.inviteId;
    this.name = stats.userName;
    let userStats = stats.stats;
>>>>>>> 7e8592e1895d9374125c8528e0b909d0ed322a76
    this.wins = userStats.wins;
    this.loses = userStats.loses;
    this.draws = userStats.draws;
    this.level = userStats.level;
  }


  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'please wait...'
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

  dismiss() {
    this.viewCtrl.dismiss()
  }
  playWith() {
    this.viewCtrl.dismiss();
    const arenaPlayer = new ArenaPlayers(this.firebasaService.userId, this.inviteId);
    this.startPageService.createArena(arenaPlayer)
      .subscribe(data => {
        this.appCtrl.getRootNav().push(MatchPage, { arena: data });
      }, err => { this.presentAlert(err.message); console.log(err) });
  }
}
