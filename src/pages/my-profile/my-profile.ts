import { Component, NgZone, AfterViewInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App, ModalController, IonicPage } from 'ionic-angular';
import { ArenaPlayers } from "../../models/arenaPlayers";
import { Stats } from "../../models/stats";
import { Sockets } from "../../providers/sockets";
import { StartingPage } from "../../providers/starting-page";
import { Auth } from "../../providers/auth";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { PlayWithChosenUserPage } from "../play-with-chosen-user/play-with-chosen-user";
import { HistoricDataProvider } from "../../providers/historic-data";
import { LeaderBoardsProvider } from "../../providers/leader-boards/leader-boards";
import { UserFound } from "../../models/userFound";
import { HintsProvider } from "../../providers/hints/hints";


/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage implements AfterViewInit {

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
  showStats: any = 'StatisticsModalPage';
  sWins;
  sLoses;
  sDraws;
  username = '';
  openMenu = false;
  public triangle = 'assets/images/login/triangle.png';
  public bacgroundImage = '';
  showBackGroundImage=false;




  ngOnInit(): void {
    if (this.firebasaService.userId) {


      this.socketService.reqStats(this.firebasaService.userId);
      this.loadStats();
      this.username = this.firebasaService.username;

    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log()
      this.bacgroundImage = 'assets/images/login/background.png';
      this.showBackGroundImage=true;

    },5000)

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
    private modalCtrl: ModalController,
    private useHint:HintsProvider

  ) { }


  loadStats() {
    this.socketService.getStats()
      .subscribe((stats: Stats) => {
        this.zone.run(() => this.setStats(stats))
      })
  }
  useOneHint(){
    this.useHint.useHint(this.firebasaService.userId,'managerAdvice').subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  setStats(stats) {
    this.level = stats.level;
    this.wins = stats.wins;
    this.loses = stats.loses;
    this.draws = stats.draws;
    let sum = this.wins + this.loses + this.draws;
    this.pWins = (((this.wins / sum) * 100) + 10).toFixed(1);
    this.pLoses = (((this.loses / sum) * 100) + 10).toFixed(1);;
    this.pDraws = (((this.draws / sum) * 100) + 10).toFixed(1);
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
      this.sLoses = this.pLoses - 10

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



  findRandom() {
    this.showLoader();
    this.startPageService.findRandomUser()
      .subscribe((result: UserFound) => {
        this.loading.dismiss();
        this.choosePlayer(result);
      }, err => {
        this.loading.dismiss();
        console.log(err);
      });
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'please wait...'
    });

    this.loading.present();
  }
  logout() {
    this.showLoader();
    this.firebasaService.signOut();
    setTimeout(() => {
      this.togglePopupMenu();
      this.loading.dismiss();
      this.socketService.logout();
      this.appCtrl.getRootNav().push('SigninPage');
    }, 1000);
  }


  presentAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  play() {
    this.appCtrl.getRootNav().push('MatchPage', {});
  }




  choosePlayer(userFound = undefined) {
    let modal = this.modalCtrl.create(this.findPlayerPage, { userFound: userFound });
    modal.present();
  }
  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  openStatistics() {
    let modal = this.modalCtrl.create(this.showStats, { userId: this.firebasaService.userId });
    modal.present();
    this.togglePopupMenu();
  }

  goToHome() {
    alert('Home clicked.');
    this.togglePopupMenu();
  }

  goToCups() {
    alert('Cups clicked.');
    this.togglePopupMenu();
  }

  goToLeaderboard() {
    let modal = this.modalCtrl.create('LeaderBoardPage', { userId: this.firebasaService.userId });
    modal.present();

  }

  goToHelp() {
    alert('Help clicked.');
    this.togglePopupMenu();
  }

  goToShop() {
    alert('Shop clicked.');
    this.togglePopupMenu();
  }



}
