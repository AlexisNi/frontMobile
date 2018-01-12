import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseServiceProvider } from "../firebase-service/firebase-service";
import { Observable } from "rxjs/Observable";
import { myGlobals } from "../../globals";

/*
  Generated class for the HintsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HintsProvider {

  constructor(
    public http: Http,
    public firebasaService: FirebaseServiceProvider) { }




  useHint(userId,hintToUse) {
    let info={userId:userId,hintToUse:hintToUse}
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(info);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'hints/use', body, { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(res => {
              observer.next(res);
            }, err => {
              observer.error(err)
            })
        })
    })
  }
    checkHints(userId) {
    let info={userId:userId}
    return new Observable((observer: any) => {
      this.firebasaService.getToken()
        .subscribe((token: any) => {
          const body = JSON.stringify(info);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
          return this.http.post(myGlobals.host + 'hints/check', body, { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(res => {
              observer.next(res);
            }, err => {
              observer.error(err)
            })
        })
    })
  }





}
