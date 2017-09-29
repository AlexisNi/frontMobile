import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from "./auth";
import { ArenaPlayers } from "../models/arenaPlayers";
import { ArenaCorrect } from "../models/arenaCorrect";
import { Observable } from "rxjs/Observable";
import { PlayerResult } from "../models/playerResult";
import { myGlobals } from "../globals";
import { FirebaseServiceProvider } from "./firebase-service/firebase-service";
import { Arenas } from "../models/arenas";
import { Awards } from "../models/awards";
import { Question } from "../models/question";

/*
  Generated class for the Arena provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Arena {

  constructor(public http: Http,
    public firebasaService: FirebaseServiceProvider) { }



  statusPlayed(arenaInfo: ArenaCorrect) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(arenaInfo);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'arenas/statusPlayed', body, { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(res => {
              observer.next(res);
            }, err => {
              observer.error(err)
            })
        })
    })
  }

  getResult(arenaUserInfo: ArenaCorrect) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(arenaUserInfo);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'activeArena/getResults', body, { headers: headers })
            .map((response: Response) => {
              console.log(response.json());
              let awards = response.json().awards;
              let transAwards: Awards = new Awards(
                awards.userId,
                awards.experience,
                awards.points,
                awards.correctAnswers,
                awards.received);
              let playerResult: PlayerResult = new PlayerResult(
                transAwards,
                response.json().isWin,
                response.json().draw,
                response.json().otherPlayerCorrect)
              return playerResult;
            }).subscribe(data => {
              observer.next(data);
            }, err => {
              observer.error(err);
            })
        })
    })

  }

  getAward(arenaInfo: ArenaCorrect) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(arenaInfo);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'awards', body, { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(data => {
              observer.next(data);
            }, err => {
              observer.error(err);
            })

        })
    })


  }

  getArenas(userId) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify({ userId: userId });
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'arenas/getArenas', body, { headers: headers })
            .map((response: Response) => {
              const arenas = response.json().obj;
              let transformedArenas: Arenas[] = [];
              let questionNumber = 0;
              let questionNumberInvite = 0;
              console.log(arenas);
              for (let arena of arenas) {
                if (arena.questionsAnswered) {
                  if (arena.questionsAnswered.hasOwnProperty('user')) {
                    if (arena.questionsAnswered.user.questionNumber != null) {
                      questionNumber = arena.questionsAnswered.user.questionNumber.questionAnswer.length;
                    } else {
                      questionNumber = 0
                    }
                  }
                } else {
                  questionNumber = 0
                }
                transformedArenas.push(new Arenas(
                  arena._id,
                  arena.user,
                  arena.invite._id,
                  arena.status_accept,
                  arena.user.username || arena.invite.username,
                  arena.user_played,
                  arena.invite_played,
                  [],
                  questionNumber));
              }
              const UserArenas = response.json().objUser;
              for (let userArena of UserArenas) {
                transformedArenas.push(new Arenas(
                  userArena._id,
                  userArena.user._id,
                  userArena.invite,
                  userArena.status_accept,
                  userArena.user.username,
                  userArena.user_played,
                  userArena.invite_played
                ));
              }
              return transformedArenas;
            }).subscribe(data => {
              observer.next(data)
            }, err => {
              observer.error(err)
            })
        })
    })
  }



}
