import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';
import { FirebaseServiceProvider } from "../firebase-service/firebase-service";
import { myGlobals } from "../../globals";

/*
  Generated class for the LeaderBoardsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LeaderBoardsProvider {

  constructor(
    public http: Http,
    public firebasaService: FirebaseServiceProvider) {
    console.log('Hello LeaderBoardsProvider Provider');
  }

  getLeaderBoard() {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.firebasaService.token);

      this.http.get(myGlobals.host + 'leaderBoard', { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }
}
