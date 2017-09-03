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

/*
  Generated class for the HistoricDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HistoricDataProvider {

  constructor(public http: Http, public firebasaService: FirebaseServiceProvider) {
    
  }

  getHistoricDataVSOpponent(userId) {
    console.log(userId);
    const body = JSON.stringify(userId);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.firebasaService.token);
    return this.http.post(myGlobals.host + 'historicData', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }
}
