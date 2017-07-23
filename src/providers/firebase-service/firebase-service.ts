import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { myGlobals } from "../../globals";
import { Observable, Subscription } from "rxjs";
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions, NotificationEventResponse } from "@ionic-native/push";

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
    public push: Push
  ) {








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
      .catch((error: Response) => {
        return Observable.throw(error.json())
      });
  }

  sendDeviceToken(deviceToken) {
    console.log('device token');
    console.log(deviceToken)
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

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '327625743458',
        vibrate:true
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);
    return pushObject;
  }



}