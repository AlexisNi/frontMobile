import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from "./auth";
import { ArenaPlayers } from "../models/arenaPlayers";
import { ArenaCorrect } from "../models/arenaCorrect";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the Arena provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Arena {

  constructor(public http: Http,
    public authService: Auth) { }

  createArena(arenaPlayers: ArenaPlayers) {
    return new Promise((resolve, reject) => {


      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('http://localhost:3000/api/arenas', JSON.stringify(arenaPlayers), { headers: headers })
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
    headers.append('Authorization', this.authService.token);
    return this.http.post('http://localhost:3000/api/arenas/statusPlayed', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }

}
