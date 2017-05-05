import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  buttonDisabled = false;
  rightButtons = [false, false, false, false];
  wrongButtons = [false, false, false, false];
  initButtons = [true, true, true, true];
  subscription: Subscription;
  inviteId;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public socketService: Sockets,
    public authService: Auth,
    public questionServie: Questions) { }

  ionViewDidLoad() {
    this.arena = this.navParams.get('arena');
    this.userId = this.authService.userId;
    this.getQuestions();
    this.getInviteId();
    this.socketService.enterArena(this.arena.arenaId, this.userId, this.inviteId);

  }
  getQuestions() {
    let arenaInfo: ArenaCorrect =new ArenaCorrect(this.userId,this.arena.arenaId);
    this.questionServie.getQuestions(arenaInfo)
      .subscribe((questions: Question[]) => {
        console.log(questions);
        this.arenaQuestions = questions;
      },err=>console.log(err.error))
  }


  nextQuestion() {
    this.index++;
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
          console.log(data);
          setTimeout(() => {
            this.nextQuestion();
          }, 1200);
        },
        error => console.error(error),

      );


    } else {
      this.buttonDisabled = true;
      this.findRightQuestion(currentQuestion);
      this.wrongButtons[buttonNumber] = true;
      this.initButtons[buttonNumber] = false;

      setTimeout(() => {
        this.nextQuestion();
      }, 1200);
    }

  }
  findRightQuestion(currentQuestion: Question) {
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
    this.navCtrl.setRoot(TabsPage);
  }
  getInviteId() {
    if (this.arena.userId == this.userId) {
      this.inviteId = this.arena.inviteId;
    } else {
      this.inviteId = this.arena.userId;
    }
    console.log(this.inviteId);

  }



  ngOnDestroy(): void {
    console.log('on Destroy all arenas');
    this.socketService.arenaLeave(this.inviteId);
  }




}
