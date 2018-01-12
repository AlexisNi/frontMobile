import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from "./auth";
import { Injectable, EventEmitter } from "@angular/core";
import { ArenaPlayers } from "../models/arenaPlayers";
import { Question } from "../models/question";
import { Arenas } from "../models/arenas";
import { Observable } from "rxjs";
import { myGlobals } from "../globals";
import { FirebaseServiceProvider } from "./firebase-service/firebase-service";
import { Stats } from "../models/stats";
import { UserFound } from "../models/userFound";


@Injectable()
export class StartingPage {
  arenaList: Arenas[] = [];
  newArena = new EventEmitter<Arenas>();
  getArenas = new EventEmitter<Arenas[]>();
  public arenas: Arenas[];

  constructor(public http: Http,
    public firebasaService: FirebaseServiceProvider)
  { }


  findUser(userName) {

    return new Promise((resolve, reject) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          this.http.post(myGlobals.host + 'users/find', JSON.stringify(userName), { headers: headers })
            .map((res: Response) => {
              let stats = res.json().statistics;
              let statsModel = new Stats(stats.level, stats.currentExp, stats.wins, stats.loses, stats.draws)
              let transFormed: UserFound = new UserFound(res.json().message, res.json().username,
                res.json().inviteId, stats, res.json().history);
              return transFormed;
            })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });

        })


    });
  }



  createArena(arenaPlayers: ArenaPlayers) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(arenaPlayers);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'arenas', body, { headers: headers })
            .map((response: Response) => {
              console.log(response);
              let transformedQuestions: Question[] = [];
              for (let finalQuestion of response.json().obj.questions) {
                transformedQuestions.push(new Question(
                  finalQuestion.question,
                  finalQuestion.optiona,
                  finalQuestion.optionb,
                  finalQuestion.optionc,
                  finalQuestion.optiond,
                  finalQuestion.answer,
                  finalQuestion._id
                ));
              }
              const arenas = new Arenas(
                response.json().obj._id,
                response.json().obj.user._id,
                response.json().obj.invite._id,
                response.json().obj.status_accept,
                response.json().obj.invite.username,
                response.json().obj.user_played,
                response.json().obj.invite_played,
                transformedQuestions);
              this.sendNewArena(arenas);
              this.arenaList.push(arenas);
              return arenas;
            })
            .subscribe(data => {
              observer.next(data);

            }, err => {
              observer.error(err.json())
            })

        })
    })


  }
  sendNewArena(arena) {
    this.newArena.emit(arena)
  }
  sendArenas(arenas) {
    this.arenas = arenas;
    this.getArenas.emit(arenas);
  }

  findRandomUser() {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          let body = { userId: this.firebasaService.userId };
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'users/findRandom', body, { headers: headers })
            .map((response: Response) => {
              let stats = response.json().statistics;
              let statsModel = new Stats(stats.level, stats.currentExp, stats.wins, stats.loses, stats.draws)
              let transFormed: UserFound = new UserFound(response.json().message, response.json().username, response.json().inviteId, stats);
              return transFormed;
            })
            .subscribe(data=>{
              observer.next(data);
            },err=>{
              observer.error(err.json())
            })
           
        })
    })


  }


}