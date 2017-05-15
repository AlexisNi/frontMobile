import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from "./auth";
import { Injectable, EventEmitter } from "@angular/core";
import { ArenaPlayers } from "../models/arenaPlayers";
import { Question } from "../models/question";
import { Arenas } from "../models/arenas";
import { Observable } from "rxjs";
import {myGlobals}  from "../globals";

/*
  Generated class for the StartingPage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StartingPage {
  arenaList: Arenas[] = [];
  newArena = new EventEmitter<Arenas>();

  constructor(public http: Http,
    public authService: Auth)
  { }


  findUser(userName) {
    console.log(userName);
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);


      this.http.post(myGlobals.host+'users/find', JSON.stringify(userName), { headers: headers })
        .map((res: Response) => { return res.json() })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });
  }
  createArena(arenaPlayers: ArenaPlayers) {
    const body = JSON.stringify(arenaPlayers);
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);
    return this.http.post(myGlobals.host+'arenas', body, { headers: headers })
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
          response.json().obj.invite.userName,
          response.json().obj.user_played,
          response.json().obj.invite_played,
          transformedQuestions);
        this.sendNewArena(arenas);
        this.arenaList.push(arenas);
        return arenas;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }
  sendNewArena(arena) {
    this.newArena.emit(arena)

  }




}
