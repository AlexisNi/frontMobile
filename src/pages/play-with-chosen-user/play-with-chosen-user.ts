import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, AlertController, ViewController, ModalController } from 'ionic-angular';
import { StartingPage } from "../../providers/starting-page";
import { ArenaPlayers } from "../../models/arenaPlayers";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { HistoricDataProvider } from "../../providers/historic-data";
import { UserFound } from "../../models/userFound";


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
  wins = 0;
  loses = 0;
  draws = 0;
  progress = 50;
  level;
  myName = '';
  name = 'Username';
  inviteId;
  randomUser = false;
  showError = false;
  errorDisplay = '';
  totalGames = 0;




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    private startPageService: StartingPage,
    public alertCtrl: AlertController,
    public zone: NgZone,
    public firebasaService: FirebaseServiceProvider,
    public viewCtrl: ViewController,
    private historic: HistoricDataProvider,
    public modalCtrl: ModalController,


  ) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('userFound') != undefined) {
      let userInfo = this.navParams.get('userFound');
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
      this.myName = this.firebasaService.username;
      this.totalGames = this.wins + this.loses + this.draws;

    }

  }

  findUser(userName) {
    this.showLoader();

    this.startPageService.findUser({ username: userName, userId: this.firebasaService.userId }).then((result: UserFound) => {
      this.historic.getHistoricDataVSOpponent({ opponentId: result.inviteId, userId: this.firebasaService.userId }).subscribe((data: any) => {
        data.inviteId = result.inviteId;
        data.userName = result.userName;
        data.level = result.stats.level;
        this.zone.run(() => this.setStats(data));
        this.loading.dismiss();
      });

    }, (err) => {
      this.userFound = false;
      this.loading.dismiss();
      this.userFound = false;
      this.showError = true;
      this.errorDisplay = err.json().message;

      /*    let alert = this.alertCtrl.create({
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
          alert.present();*/
    });
  }
  setStats(stats) {
    this.myName = this.firebasaService.username;
    this.userFound = true;
    this.inviteId = stats.inviteId;
    this.name = stats.userName;
    let userStats = stats.history;

    this.wins = userStats.wins;
    this.loses = userStats.loses;
    this.draws = userStats.draws;
    this.level = userStats.level;
    this.totalGames = this.wins + this.loses + this.draws;

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
  goBack() {
    this.userFound = false;
    this.showError = false;

  }
  playWith() {
    this.showLoader();
    this.viewCtrl.dismiss();
    const arenaPlayer = new ArenaPlayers(this.firebasaService.userId, this.inviteId);
    this.startPageService.createArena(arenaPlayer)
      .subscribe(data => {
        this.loading.dismiss();
        /*  let modal = this.modalCtrl.create('MatchModalPage', { arena: data }, { enableBackdropDismiss: false, cssClass: 'inset-modal' });
          modal.onDidDismiss(data => {
            if (data != null) {
              console.log('dissmiss');
             
            }
          });
          modal.present();*/

        this.appCtrl.getRootNav().push('MatchPage', { arena: data });
      }, (err:any) => {

        this.userFound = false;
        this.showError = true;
        this.errorDisplay = err.message;
        this.loading.dismiss();


        this.presentAlert(err.message);
      });
  }
}
