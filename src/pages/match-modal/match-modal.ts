import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, App } from 'ionic-angular';
import { Sockets } from "../../providers/sockets";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { Questions } from "../../providers/questions";
import { Arena } from "../../providers/arena";
import { Question } from "../../models/question";
import { Arenas } from "../../models/arenas";
import { ArenaCorrect } from "../../models/arenaCorrect";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { ArenaAnsweredQuestion } from "../../models/arenaAnsweredQuestion";
import { AnsweredQuestion } from "../../models/answeredQuestion";

/**
 * Generated class for the MatchModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-match-modal',
  templateUrl: 'match-modal.html',
})
export class MatchModalPage implements OnDestroy {

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
  questionsLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public socketService: Sockets,
    public firebasaService: FirebaseServiceProvider,
    public questionServie: Questions,
    public arenaService: Arena,
    public loadingCtrl: LoadingController,
    public appCtrl: App) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
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
        /*       this.questionServie.initAnswers(true, this.arena.arenaId, this.userId).subscribe();
        */

        this.arenaQuestions = questions;
        this.loading.dismiss();
      this.timer();
      }, err => {
        this.dismiss()
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
      this.initButtons[i] = true;
      this.buttonDisabled = false;


    }
  }

  checkQuestion(chosenAnswer, currentQuestion: Question, buttonNumber) {
    if (chosenAnswer === currentQuestion.answer) {
      this.buttonDisabled = true;
      let questionAnswer = new AnsweredQuestion(currentQuestion.questionId, true, this.realTime);
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
  }
  findRightQuestion(currentQuestion: Question) {
    if (currentQuestion.answer == currentQuestion.optiona) {
      this.rightButtons[0] = true;
      this.initButtons[0] = false;
    } else if (currentQuestion.answer == currentQuestion.optionb) {
      this.rightButtons[1] = true;
      this.initButtons[1] = false;
    } else if (currentQuestion.answer == currentQuestion.optionc) {
      this.rightButtons[2] = true;
      this.initButtons[2] = false;
    }
    else if (currentQuestion.answer == currentQuestion.optiond) {
      this.rightButtons[3] = true;
      this.initButtons[3] = false;
    }



  }
  cancelButton() {
   this.dismiss();
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


  ngOnDestroy(): void {
    console.log('on Destroy all arenas');
    this.subscription.unsubscribe();
    this.socketService.arenaLeave(this.inviteId);
    this.statusPlayed();

    this.socketService.reqOneArena(this.inviteId, this.arena.arenaId);
    this.socketService.reqOneArena(this.userId, this.arena.arenaId);

  }

  showLoader() {
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
    this.viewCtrl.dismiss();

  }


}
