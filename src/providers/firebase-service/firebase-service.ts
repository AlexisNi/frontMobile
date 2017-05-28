import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { myGlobals } from "../../globals";
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  public token;

  constructor(
    public http: Http,
    public afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform,
    public storage: Storage
  ) {







  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        console.log()
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res.credential.accessToken);
          this.token = res.credential.accessToken;
          this.storage.set('token', res.credential.accessToken);

        });
    }
  }

  checkAuthentication() {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user: firebase.User) => {
        if (!user) {
          reject('User not logged in');
        }

        console.log('here')
        this.afAuth.auth.currentUser.getToken(true).then((idToken) => {
          this.token = idToken;

          let headers = new Headers();
          headers.append('Authorization', this.token);
          this.http.get(myGlobals.host +'firebase/protected', { headers: headers })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });


        }).catch(function (error) {
          reject(error);
        });
      });

  /*    let headers = new Headers();
      headers.append('Authorization', this.token);
      this.http.get(myGlobals.host + 'firebase/protected', { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });*/



    });

  }

  signOut() {
    this.afAuth.auth.signOut();
  }


  firebaseAuth() {
    const body = JSON.stringify({ a: 'asdasd' });


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);
    return this.http.post(myGlobals.host + 'firebase', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });




  }

  getToken() {



  }




}
