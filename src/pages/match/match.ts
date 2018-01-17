import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, LoadingController, App, IonicPage } from 'ionic-angular';
import { Question } from "../../models/question";
import { Arenas } from "../../models/arenas";
import { Sockets } from "../../providers/sockets";
import { Auth } from "../../providers/auth";
import { AnsweredQuestion } from "../../models/answeredQuestion";
import { Questions } from "../../providers/questions";
import { ArenaAnsweredQuestion } from "../../models/arenaAnsweredQuestion";
import { Subscription, Subject } from "rxjs";
import { FirstPage } from "../first/first";
import { ArenaCorrect } from "../../models/arenaCorrect";
import { Arena } from "../../providers/arena";
import { Observable } from "rxjs/Observable";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { HintsProvider } from "../../providers/hints/hints";
import _ from 'lodash';
/*
  Generated class for the Match page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
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
  hideButtons = [false, false, false, false]
  subscription: Subscription;
  inviteId;
  loading: any;
  time = 100;
  realTime = 30;
  questionsLoaded = false;

  getAdviceHint = new Subject<string>();
  canUseAdvice = false;
  getExtraTimeHint = new Subject<string>();
  canUseExtraTime = false;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socketService: Sockets,
    public firebasaService: FirebaseServiceProvider,
    public questionServie: Questions,
    public arenaService: Arena,
    public loadingCtrl: LoadingController,
    public useHint: HintsProvider,
    public appCtrl: App) {

    const observableAdvice = this.getAdviceHint
      .map(value => value)
      .debounceTime(500)
      .flatMap((search) => {
        return Observable.of(search).delay(100);
      })
      .subscribe((data) => {
        if (this.canUseAdvice == true) {
          this.canUseAdvice = false;
          this.useHint.useHint(this.userId,'managerAdvice').subscribe();
          this.getAdvice(data);
        }

      });

    const observableExtraTime = this.getExtraTimeHint
      .map(value => value)
      .debounceTime(500)
      .flatMap((search) => {
        return Observable.of(search).delay(100);
      })
      .subscribe((data) => {
        if (this.canUseExtraTime == true) {
          this.canUseExtraTime = false;
          this.useHint.useHint(this.userId,'extraTime').subscribe();
          this.getExtraTime();
        }

      });


  }

  ionViewDidLoad() {
/*    this.arena = this.navParams.get('arena');
    this.userId = this.firebasaService.userId;
    this.getInviteId();
    this.socketService.enterArena(this.arena.arenaId, this.userId, this.inviteId);
    this.arenaInfo = new ArenaCorrect(this.userId, this.arena.arenaId);
    this.useHint.checkHints(this.userId).subscribe((data:any) => {
      this.canUseExtraTime=data.canUseHint.extraTime;
      this.canUseAdvice=data.canUseHint.managerAdvice;      
      this.getQuestions();

    })*/

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
        this.appCtrl.getRootNav().setRoot('TabsPage', { index: 1 });
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
      this.hideButtons[i] = false;
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
    this.navCtrl.setRoot('TabsPage', { index: 1 });
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
      data => {
        this.socketService.reqOneArena(this.inviteId, this.arena.arenaId);


      },
      error => console.log(error));

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.socketService.arenaLeave(this.inviteId, this.arena.userId, this.arena.arenaId);
    this.statusPlayed();

    /*    this.socketService.reqOneArena(this.userId, this.arena.arenaId);
    */
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
    this.navCtrl.setRoot('TabsPage', { index: 1 });

  }

  getAdvice(answer: any) {
    console.log(answer);
    let rightAnswer;
    let secondChoise = Math.floor((Math.random() * 3) + 1);
    let optionsArray = ['optiona', 'optionb', 'optionc', 'optiond'];
    let rightAnswerIndex;

    if (answer.answer === answer.optiona) {
      console.log('inside')
      rightAnswer = 'optiona'
      rightAnswerIndex = _.indexOf(optionsArray, rightAnswer, 0);


    }
    else if (answer.answer === answer.optionb) {
      rightAnswer = 'optionb'
      rightAnswerIndex = _.indexOf(optionsArray, rightAnswer, 0);

    }
    else if (answer.answer === answer.optionc) {
      rightAnswer = 'optionc'
      rightAnswerIndex = _.indexOf(optionsArray, rightAnswer, 0);
    }
    else {
      rightAnswer = 'optiond'
      rightAnswerIndex = _.indexOf(optionsArray, rightAnswer, 0);
    }

    if (secondChoise === rightAnswerIndex) {
      if (rightAnswerIndex === 3) {
        secondChoise = 2;
        this.hideButtons[0] = true;
        this.hideButtons[1] = true;


      }
      else if (rightAnswerIndex === 2) {
        secondChoise = 3;
        this.hideButtons[0] = true;
        this.hideButtons[1] = true;
      }
      else if (rightAnswerIndex === 1) {
        secondChoise = 0;
        this.hideButtons[2] = true;
        this.hideButtons[3] = true;
      }
      else if (rightAnswerIndex === 0) {
        secondChoise = 1;
        this.hideButtons[2] = true;
        this.hideButtons[3] = true;
      }
    } else {
      for (let i = 0; i < this.hideButtons.length; i++) {
        console.log(secondChoise);
        if (i === rightAnswerIndex || i == secondChoise) {
          this.hideButtons[i] = false;

        } else {
          this.hideButtons[i] = true;
        }

      }


    }

  }

  getExtraTime() {
    this.time = this.time + 15;
    this.realTime = this.realTime + 5;

  }





}
