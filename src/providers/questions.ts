import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Auth} from "./auth";
import {Observable} from "rxjs";
import {ArenaAnsweredQuestion} from "../models/arenaAnsweredQuestion";

/*
  Generated class for the Questions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Questions {

  constructor(public http: Http,
              public authService: Auth) {
    console.log('Hello Questions Provider');
  }

  saveAnsweredQuestion(answer: ArenaAnsweredQuestion) {
    const body = JSON.stringify(answer);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);

    return this.http.post('http://localhost:3000/api/activeArena', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });

  }
}
