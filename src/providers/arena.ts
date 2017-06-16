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

/*
  Generated class for the Arena provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Arena {

  constructor(public http: Http,
    public firebasaService: FirebaseServiceProvider) { }

  createArena(arenaPlayers: ArenaPlayers) {
    return new Promise((resolve, reject) => {


      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.firebasaService.token);

      this.http.post(myGlobals.host + 'arenas', JSON.stringify(arenaPlayers), { headers: headers })
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }
  statusPlayed(arenaInfo: ArenaCorrect) {
    const body = JSON.stringify(arenaInfo);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.firebasaService.token);
    return this.http.post(myGlobals.host + 'arenas/statusPlayed', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }

  getResult(arenaUserInfo: ArenaCorrect) {
    const body = JSON.stringify(arenaUserInfo);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.firebasaService.token);
    return this.http.post(myGlobals.host + 'activeArena/getResults', body, { headers: headers })
      .map((response: Response) => {
        const winner = response.json().winner;
        const loser = response.json().loser;
        const Awards = response.json().awards;
        var WinnerResult = new PlayerResult(
          winner._id,
          winner.userName,
          loser._id,
          loser.userName,
          Awards.awards.winner,
          Awards.awards.loser,
          Awards.awards.draw,
          response.json().draw
        );
        return WinnerResult;



      })
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }

  getAward(arenaInfo: ArenaCorrect) {
    const body = JSON.stringify(arenaInfo);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.firebasaService.token);
    return this.http.post(myGlobals.host + 'awards', body, { headers: headers })
      .map((response: Response) => response.json())
     .debounceTime(5000)
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }



}
