import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from "./auth";
import { Observable } from "rxjs";
import { ArenaAnsweredQuestion } from "../models/arenaAnsweredQuestion";
import { Question } from "../models/question";

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

    return this.http.post('http://localhost:3000/api/activeArena', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });

  }

  getCorrectNumber(arenaInfo) {
    const body = JSON.stringify(arenaInfo);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);

    return this.http.post('http://localhost:3000/api/activeArena/getCorrect', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }
  getQuestions(arenaInfo) {
    const body = JSON.stringify(arenaInfo);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);

    return this.http.post('http://localhost:3000/api/activeArena/getQuestions', body, { headers: headers })
      .map((response: Response) => {
        console.log(response);
         let questions=response.json().questions;
         console.log(questions);
         let transFormedQuestions:Question[]=[];
        for (let question of questions){
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
        return transFormedQuestions;

      }) 
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });

  }
}
