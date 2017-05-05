import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/map';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  public token: any;
  public userId:any;
  public username:any;


  constructor(public http: Http, public storage: Storage) {

  }

  checkAuthentication(){

    return new Promise((resolve, reject) => {

      this.storage.get('userId').then((val) => {
        this.userId=val;

      });
      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get('http://localhost:3000/api/auth/protected', {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });

      });

    });

  }

  createAccount(details){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:3000/api/auth/register', JSON.stringify(details), {headers: headers})
        .subscribe(res => {

          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          this.storage.set('userId',data.user._id);

        }, (err) => {
          reject(err);
        });

    });

  }

  login(credentials){

         return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://localhost:3000/api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {

            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            this.storage.set('userId',data.user._id);

            resolve(data);

            resolve(res.json());
          }, (err) => {
            reject(err);
          });

    });

  }


  logout(){
    this.storage.set('token', '');
  }

}
