import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { HistoricDataProvider } from "../../providers/historic-data";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { StatisticsModal } from "../../models/statisticsModal";
import { Last5matches } from "../../models/last5Matches";

/**
 * Generated class for the StatisticsModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-statistics-modal',
  templateUrl: 'statistics-modal.html',
})
export class StatisticsModalPage {
  wins;
  loses;
  draws;
  pWins;
  pLoses;
  pDraws;
  sWins;
  sLoses;
  sDraws;
  totalGames;
  winningStreak;
  losingStreak;
  drawStreak;
  rightQuestions;
  forms: Last5matches[] = [];
  loading: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getStats: HistoricDataProvider,
    public firebasaService: FirebaseServiceProvider,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController ) {
  }

  ionViewDidLoad() {
    this.showLoader();
    this.loadStats(this.firebasaService.userId);

  }
  
  dismiss() {

    this.viewCtrl.dismiss();
  }

  loadStats(userId) {
    this.getStats.getStats(userId)
      .subscribe(stats => {
        this.zone.run(() => this.setStats(stats))
      }, err => {
        this.loading.dismiss();
        console.log(err);
      })
  }
  setStats(stats) {
    console.log(stats);
    let statistics = stats.stats;
    this.wins = statistics.wins;
    this.loses = statistics.loses;
    this.draws = statistics.draws;
    this.winningStreak = statistics.winningStreak;
    this.losingStreak = statistics.losingStreak;
    this.drawStreak = statistics.drawStreak;
    this.rightQuestions = statistics.rightAnswer;
    let sum = this.wins + this.loses + this.draws;
    this.totalGames=sum;
    let form = stats.last5matches;
    this.forms = form;
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
    this.loading.dismiss();

  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'stats loading...'
    });

    this.loading.present();
  }

}
