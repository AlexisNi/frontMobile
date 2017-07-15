import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { Question } from "../../models/question";
import { Arenas } from "../../models/arenas";
import { Sockets } from "../../providers/sockets";
import { Auth } from "../../providers/auth";
import { AnsweredQuestion } from "../../models/answeredQuestion";
import { Questions } from "../../providers/questions";
import { ArenaAnsweredQuestion } from "../../models/arenaAnsweredQuestion";
import { Subscription } from "rxjs";
import { FirstPage } from "../first/first";
import { TabsPage } from "../tabs/tabs";
import { ArenaCorrect } from "../../models/arenaCorrect";
import { Arena } from "../../providers/arena";
import { Observable } from "rxjs/Observable";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

/*
  Generated class for the Match page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-match',
  templateUrl: 'match.html'
})
export class MatchPage implements OnDestroy {
  arenaQuestions: Question[] = [];
  arena: Arenas;
  index = 0;
  userId;
  arenaInfo: ArenaCorrect;
  buttonDisabled = false;
  rightButtons = [false, false, false, false];
  wrongButtons = [false, false, false, false];
  initButtons = [true, true, true, true];
  subscription: Subscription;
  inviteId;
  loading: any;
  time = 100;
  realTime = 30;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public socketService: Sockets,
    public firebasaService: FirebaseServiceProvider,
    public questionServie: Questions,
    public arenaService: Arena,
    public loadingCtrl: LoadingController,
    public appCtrl: App) { }
/*
  ionViewDidLoad() {
    this.arena = this.navParams.get('arena');
    this.userId = this.firebasaService.userId;
    this.getQuestions();
    this.getInviteId();
    this.socketService.enterArena(this.arena.arenaId, this.userId, this.inviteId);
    this.arenaInfo = new ArenaCorrect(this.userId, this.arena.arenaId);

  }
  getQuestions() {
    this.showLoader();
    let arenaInfo: ArenaCorrect = new ArenaCorrect(this.userId, this.arena.arenaId);
    this.questionServie.getQuestions(arenaInfo)
      .subscribe((questions: Question[]) => {
        this.questionServie.initAnswers(true, this.arena.arenaId, this.userId).subscribe();
        console.log(questions);
        this.arenaQuestions = questions;
        this.loading.dismiss();
        this.timer();
      }, err => {
        this.appCtrl.getRootNav().push(TabsPage, { index: 1 });
        this.loading.dismiss();
        console.log(err.error);

      })
  }


  nextQuestion() {
    this.time = 100;
    this.realTime = 30;
    this.index++;
    this.timer();
    if (this.index > 9) {
      this.playerLost();

    }
    for (let i in this.rightButtons) {
      this.rightButtons[i] = false;
      this.wrongButtons[i] = false;
      this.initButtons[i] = false;
      this.buttonDisabled = false;


    }
  }

  checkQuestion(chosenAnswer, currentQuestion: Question, buttonNumber) {
    if (chosenAnswer === currentQuestion.answer) {
      this.buttonDisabled = true;
      let questionAnswer = new AnsweredQuestion(currentQuestion.questionId, true);
      let questionAns = new ArenaAnsweredQuestion(this.arena.arenaId, this.userId, questionAnswer);
      this.rightButtons[buttonNumber] = true;
      this.initButtons[buttonNumber] = false;
      this.questionServie.saveAnsweredQuestion(questionAns)
        .subscribe(
        data => {
          this.time = 100;
          this.subscription.unsubscribe();
          setTimeout(() => {
            if (this.index > 9) {
              this.playerLost();
            }
            this.realTime = 30;
            this.nextQuestion();
          }, 1200);
        },
        error => console.error(error),

      );


    } else {
      this.subscription.unsubscribe();
      this.buttonDisabled = true;
      this.findRightQuestion(currentQuestion);
      this.wrongButtons[buttonNumber] = true;
      this.initButtons[buttonNumber] = false;

      setTimeout(() => {
        this.playerLost();
      }, 1200);
    }
  }*/
 /* findRightQuestion(currentQuestion: Question) {
    if (currentQuestion.answer == currentQuestion.optiona) {
      this.rightButtons[0] = true;
    } else if (currentQuestion.answer == currentQuestion.optionb) {
      this.rightButtons[1] = true;
    } else if (currentQuestion.answer == currentQuestion.optionc) {
      this.rightButtons[2] = true;
    }
    else if (currentQuestion.answer == currentQuestion.optiond) {
      this.rightButtons[3] = true;
    }



  }
  cancelButton() {
    this.navCtrl.setRoot(TabsPage, { index: 1 });
  }
  getInviteId() {
    if (this.arena.userId == this.userId) {
      this.inviteId = this.arena.inviteId;
    } else {
      this.inviteId = this.arena.userId;
    }

  }

  statusPlayed() {
    this.arenaService.statusPlayed(this.arenaInfo)
      .subscribe(
      data => console.log(data),
      error => console.log(error));
  }
*/

  ngOnDestroy(): void {

   /* console.log('on Destroy all arenas');
    this.subscription.unsubscribe();
    this.socketService.arenaLeave(this.inviteId);
    this.statusPlayed();
    this.socketService.reqOneArena(this.inviteId, this.arena.arenaId);*/
  }

 /* showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait questions loading...'
    });
    this.loading.present();
  }

  timer() {
    let timer = Observable.timer(100, 1000);
    this.subscription = timer.subscribe(t => {
      this.time = this.time - 3.3;
      this.realTime = this.realTime - 1;
      if (this.realTime <= 0) {
        this.realTime = 0;
      }
      if (this.time <= 0) {
        this.time = 0;
        this.playerLost();
        this.subscription.unsubscribe();
      }
    });
  }
  playerLost() {
    this.navCtrl.setRoot(TabsPage);

  }



*/

}
