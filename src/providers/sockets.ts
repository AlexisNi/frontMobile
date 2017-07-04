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

/*
  Generated class for the Sockets provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Sockets {
  private socket:any;
/*  private socket = io(myGlobals.socket ,{ query: { userId: this.firebasaService.userId } });
*/  /*  private socket: any = io(myGlobals.socket, { query: { userId: this.authService.userId } });
  */


  constructor(
    public http: Http,
    public firebasaService: FirebaseServiceProvider) {
      this.socket=io.connect(myGlobals.socket ,{ query: { userId: this.firebasaService.userId } });


  }
  

  /*connect() {
    this.socket = io(myGlobals.socket, { query: { userId: this.firebasaService.userId } });
    this.socket.on('connect', () => {
      console.log('connected');


   
    });
  }*/

  //////////////////////req-get stats///////////////////////

  reqStats(userId) {

    console.log(userId);
    this.socket.emit('getStats', { userId: userId });
  }

  enterArena(arenaId: string, userId: string, inviteId: string) {
    this.socket.emit('enterArena', { arenaId: arenaId, userId: userId, inviteId: inviteId });
  }

  arenaLeave(userId) {
    this.socket.emit('leaveArena');
 /*   this.reqArenas(userId);*/
    this.sendNotification(userId);
  }

  sendNotification(userId) {
    this.socket.emit('sendNotication', { userId: userId });
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

  //////////////////////req-get stats///////////////////////


  ////////////req-get arenas////////////////////////////


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
          transformedArena = new Arenas(
            arena._id,
            arena.user,
            arena.invite._id,
            arena.status_accept,
            arena.user.username || arena.invite.username,
            arena.user_played,
            arena.invite_played
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
        this.socket.on('error',()=>{
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

  ////////////req-get arenas////////////////////////////


  //////////start-req-get Questions////////////////////////////

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






  ////////////end-req-get Questions////////////////////////////
}
