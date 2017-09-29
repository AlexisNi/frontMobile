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
import { Stats } from "../models/stats";
import { StatisticsModal } from "../models/statisticsModal";
import { Last5matches } from "../models/last5Matches";

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
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(userId);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'historicData', body, { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(data => {
              observer.next(data)
            }, err => {
              observer.error(err)
            })
        })
    })

  }

  getStats(userId) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify({ userId: userId });
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'historicData/stats', body, { headers: headers })
            .map((response: Response) => {
              console.log(response.json());
              let stats = response.json().stats;
              let last5matches = response.json().last5Matches;
              let transformedArray: Last5matches[] = [];
              for (let last5match of last5matches) {
                transformedArray.push(new Last5matches(last5match.userName, last5match.result));
              }
              let transformedStats = new StatisticsModal(stats.wins, stats.loses, stats.draws, stats.winningStreak, stats.losingStreak, stats.drawStreak, stats.rightQuestionsNumber);
              let statistics = { last5matches: transformedArray, stats: transformedStats };
              return statistics;
            })
            .subscribe(data=>{
              observer.next(data);
            },err=>{
              observer.error(err);
            })
        })
    })
  }
}
