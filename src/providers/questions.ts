import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from "./auth";
import { Observable } from "rxjs";
import { ArenaAnsweredQuestion } from "../models/arenaAnsweredQuestion";
import { Question } from "../models/question";
import { myGlobals } from "../globals";
import { FirebaseServiceProvider } from "./firebase-service/firebase-service";

/*
  Generated class for the Questions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Questions {

  constructor(
    public http: Http,
    public firebasaService: FirebaseServiceProvider) {
    console.log('Hello Questions Provider');
  }

  saveAnsweredQuestion(answer: ArenaAnsweredQuestion) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(answer);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);

          return this.http.post(myGlobals.host + 'activeArena', body, { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(data => {
              observer.next(data)
            }, err => {
              observer.err(err)
            })
        })
    })


  }
  initAnswers(answer: boolean, arenaId: string, userId: string) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const init = { arenaId: arenaId, userId: userId, question: { answer: answer } }
          const body = JSON.stringify(init);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);

          return this.http.post(myGlobals.host + 'activeArena', body, { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(data => {
              observer.next(data)
            }, error => {
              observer.error(error)
            })
        })
    })
  }

  getCorrectNumber(arenaInfo) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(arenaInfo);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);

          return this.http.post(myGlobals.host + 'activeArena/getCorrect', body, { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(data => {
              observer.next(data)
            }, error => {
              observer.error(error);
            })

        })
    })

  }
  getQuestions(arenaInfo) {
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(arenaInfo);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);

          return this.http.post(myGlobals.host + 'activeArena/getQuestions', body, { headers: headers })
            .map((response: Response) => {
              console.log(response);
              let questions = response.json().questions;
              console.log(questions);
              let transFormedQuestions: Question[] = [];
              for (let question of questions) {
                transFormedQuestions.push(new Question(
                  question.question,
                  question.optionA,
                  question.optionB,
                  question.optionC,
                  question.optionD,
                  question.answer,
                  question._id

                ));
              }
              return transFormedQuestions;

            })
            .subscribe(data=>{
              observer.next(data)
            },err=>{
              observer.error(err)
            })

        })
    })
  }
}
