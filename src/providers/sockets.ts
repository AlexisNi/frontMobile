import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from "socket.io-client";
import { Auth } from "./auth";
import { Observable } from "rxjs";
import { Stats } from "../models/stats";
import { Arenas } from "../models/arenas";
import { Question } from "../models/question";
import { myGlobals } from "../globals";
import { FirebaseServiceProvider } from "./firebase-service/firebase-service";


@Injectable()
export class Sockets {
  private socket: any;



  constructor(
    public http: Http,
    public firebasaService: FirebaseServiceProvider) {

  }


  connect() {
    this.socket = io.connect(myGlobals.socket + '/mainGame', {
      reconnectionAttempts: 10,
      reconnectionDelayMax: 5000,
      reconnectionDelay: 1000,
      query:
      {
        userId: this.firebasaService.userId
      }
    });
  }
  checkIfUserIsOnTheList() {
    this.socket = io.connect(myGlobals.socket + '/checkIfUser', {});

  }
  IsPlayerAlreadyOnSocketList() {
    this.socket.emit('checkUser', {userId: this.firebasaService.userId});

    {
      let obsevable = new Observable((observer: any) => {
        this.socket.on("connectedStatus", (status) => {
          console.log(status);
          observer.next(status);
        })
      });
      return obsevable;
    }

  }


  onConnect() {
    let obsevable = new Observable((observer: any) => {
      this.socket.on("reconnect", (attempt) => {
        console.log(attempt);
        observer.next('connected');
      })
    });
    return obsevable;
  }
  onRecconecting() {
    let obsevable = new Observable((observer: any) => {
      this.socket.on("reconnecting", (attempt) => {
        observer.next(attempt);


      })
    });
    return obsevable;

  }
  onRecconectAttempt() {
    let obsevable = new Observable((observer: any) => {
      this.socket.on("reconnect_attempt", (attempt) => {
        observer.next(attempt);

      })
    });
    return obsevable;

  }
  onRecconectFailed() {
    let obsevable = new Observable((observer: any) => {
      this.socket.on("reconnect_failed", () => {
        console.log('fail')
        observer.next('failed')

      })
    });
    return obsevable;

  }


  reqStats(userId) {
    this.socket.emit('getStats', { userId: userId });
  }

  enterArena(arenaId: string, userId: string, inviteId: string) {
    this.socket.emit('enterArena', { arenaId: arenaId, userId: userId, inviteId: inviteId });
  }

  logout() {
    this.socket.disconnect();
    this.socket.removeAllListeners();
    this.socket.emit("logout");
  }

  arenaLeave(inviteId, userId, arenaId) {
    this.socket.emit('leaveArena');
    /*   this.reqArenas(userId);*/
    this.sendNotification(userId, inviteId, arenaId);
  }

  sendNotification(userId, inviteId, arenaId) {
    this.socket.emit('sendNotication', { userId: userId, inviteId: inviteId, arenaId: arenaId });
  }

  getStats() {
    this.socket.removeAllListeners('loadStats');
    let obsevable = new Observable((observer: any) => {
      this.socket.on('loadStats', (data: any) => {
        const stats = data.obj;
        let transFormedStats: Stats;
        transFormedStats = new Stats(stats.level, stats.currentExp, stats.wins, stats.loses, stats.draws);
        observer.next(transFormedStats);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return obsevable;

  }




  reqArenas(userId) {
    this.socket.emit('getArenas', { userId: userId });
  }

  reqOneArena(userId, arenaId) {
    this.socket.emit('sendArena', { userId: userId, arenaId: arenaId });
  }

  getOneArena() {
    this.socket.removeAllListeners('loadOneArena');
    let observable = new Observable((observer: any) => {
      this.socket.on('loadOneArena', (data: any) => {
        let transformedArena: Arenas
        if (data.obj != null) {
          const arena = data.obj;
          let questionNumber = 0;
          if (arena.questionsAnswered) {
            questionNumber = arena.questionsAnswered.user.questionNumber.questionAnswer.length;
          } else {
            questionNumber = 0
          }
          transformedArena = new Arenas(
            arena._id,
            arena.user,
            arena.invite._id,
            arena.status_accept,
            arena.user.username || arena.invite.username,
            arena.user_played,
            arena.invite_played,
            [],
            questionNumber

          )
        }
        if (data.objUser != null) {
          const UserArenas = data.objUser;
          transformedArena = new Arenas(
            UserArenas._id,
            UserArenas.user._id,
            UserArenas.invite,
            UserArenas.status_accept,
            UserArenas.user.username,
            UserArenas.user_played,
            UserArenas.invite_played,
          );
        }
        observer.next(transformedArena);
      });
      return (error) => {
        observer.error(error);
        this.socket.disconnect();
      }
    })
    return observable;
  }

  getArenas() {

    this.socket.removeAllListeners('loadArenas');
    let observable = new Observable((observer: any) => {
      this.socket.on('error', () => {
        console.log('error');
      })
      this.socket.on('loadArenas', (data: any) => {
        const arenas = data.obj;
        let transformedArenas: Arenas[] = [];
        for (let arena of arenas) {
          transformedArenas.push(new Arenas(
            arena._id,
            arena.user,
            arena.invite._id,
            arena.status_accept,
            arena.user.username || arena.invite.username,
            arena.user_played,
            arena.invite_played,

          ));
        }
        const UserArenas = data.objUser;
        for (let userArena of UserArenas) {

          transformedArenas.push(new Arenas(
            userArena._id,
            userArena.user._id,
            userArena.invite,
            userArena.status_accept,
            userArena.user.username,
            userArena.user_played,
            userArena.invite_played,
          ));
        }
        observer.next(transformedArenas);
      });
      return (error) => {
        observer.error(error);
        this.socket.disconnect();
      }
    })
    return observable;
  }


  reqQuestions(userId, arenaId) {
    this.socket.emit('getQuestions', { userId: userId, arenaId: arenaId })
  }
  getQuestions() {

    this.socket.removeAllListeners('getQuestions');
    let observable = new Observable((observer: any) => {
      this.socket.on('loadQuestions', (data: any) => {
        const questions = data.obj;
        let transFormedQuestions: Question[] = [];
        for (let question of questions) {
          transFormedQuestions.push(new Question(
            question.question,
            question.optiona,
            question.optionb,
            question.optionc,
            question.optiond,
            question.answer,
            question._id

          ));
        }
        observer.next(transFormedQuestions)

      });
      return () => {
        this.socket.disconnect();
      }

    });
    return observable

  }

}
