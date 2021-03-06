import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { myGlobals } from "../../globals";
import { Observable, Subscription } from "rxjs";
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  public token;
  public userId;
  public firebaseUserId;
  public username;
  checkSub: Subscription;
  constructor(
    public http: Http,
    public afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform,
    public storage: Storage,
    private fcm: FCM
  ) { }
  getAuth() {
    return this.afAuth.auth;
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

        return firebase.auth().signInWithCredential(facebookCredential).then(res => { console.log(res) });
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider()) 
        .then(res => {
        });
    }
  }
  signUpWithEmailPassword(email, password) {
    return this.afAuth.auth.
      createUserWithEmailAndPassword(email, password)
  }
  signInWithEmailPassword(email, password) {
    return this.afAuth.auth.
      signInWithEmailAndPassword(email, password)
  }

  getToken() {
    let obsevable = new Observable((observer: any) => {
      this.afAuth.auth.currentUser.getToken(false).then((idToken) => {
        observer.next(idToken);
      })
    });
    return obsevable;
  }

  notificationHandler() {
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log('getToken',token);
    })
  }

  async onNotification() {
    try {
      await this.platform.ready();
      this.fcm.getToken().then(token => {
        console.log(token);
        this.sendDeviceToken(token).subscribe(data=>{
          console.log(data)
        });
      })
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        this.sendDeviceToken(token).subscribe(data=>{
          console.log(data)
        });;

      })
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log("Received in background");
          alert(JSON.stringify(data));
        } else {
          console.log("Received in foreground");
          alert(JSON.stringify(data));

        };
      })
    } catch (err) {
      console.log(err)
    }
  }





  checkAuthentication() {
    return new Promise((resolve, reject) => {
      this.checkSub = this.afAuth.authState.subscribe((user: firebase.User) => {
        if (!user) {
          reject('User not logged in');
        }
        else {
          this.afAuth.auth.currentUser.getToken(true).then((idToken) => {
            this.token = idToken;
            let headers = new Headers();
            headers.append('Authorization', this.token);
            this.http.get(myGlobals.host + 'firebase/protected', { headers: headers })
              .map((response: Response) => response.json())
              .catch((error: Response) => {
                return Observable.throw(error.json())
              })
              .subscribe(res => {
                this.firebaseUserId = res.user_id;
                resolve(res);
              }, (err) => {
                reject(err);
              });
          }).catch(function (error) {
            reject(error);
          });
        }
      });
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

  checkUser() {
    const body = JSON.stringify({});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);
    return this.http.post(myGlobals.host + 'firebase/checkuser', body, { headers: headers })
      .map((response: Response) => {
        response.json();
        this.userId = response.json().user_id;
        this.username = response.json().username;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }

  createUser(username) {
    const body = JSON.stringify({ firebase_id: this.firebaseUserId, username: username });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);
    return this.http.post(myGlobals.host + 'firebase/createUser', body, { headers: headers })
      .map((response: Response) => response.json())
      .debounceTime(1000)
      .distinctUntilChanged()
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }

  sendDeviceToken(deviceToken) {
    console.log('device token');
    const body = JSON.stringify({ devToken: deviceToken, userId: this.userId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);
    return this.http.post(myGlobals.host + 'firebase/devToken', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }
  chechUnsubscribe() {
    this.checkSub.unsubscribe();
  }



}