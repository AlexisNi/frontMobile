import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from "../../providers/auth";
import { StartingPagePage } from "../starting-page/starting-page";
import { FirstPage } from "../first/first";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform, ModalController, AlertController, IonicPage } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { Sockets } from "../../providers/sockets";
import { Keyboard } from '@ionic-native/keyboard';
import { Subscription } from "rxjs/Subscription";


/*
  Generated class for the Signin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage implements OnInit, OnDestroy {
  checkUserSubscription: Subscription;
  IsPlayerAlreadyOnSocketList: Subscription;
  public backgroundImage = 'assets/images/login/SIMA.png';
  public triangle ='assets/images/login/triangle.png';
  
  ngOnDestroy(): void {
    this.firebaseService.chechUnsubscribe();
  }
  ngOnInit(): void {


  }


  email: string = 'a@hotmail.com';
  password: string = '123456';
  loading: any;
  displayName;
  keyboardShowed = false;


  show(event) {
    console.log(event);
    this.keyboardShowed = true;
    this.keyboard.show();

  }




  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    public alertCtrl: AlertController,
    private firebaseService: FirebaseServiceProvider,
    private modalCtrl: ModalController,
    public socketService: Sockets,
    private keyboard: Keyboard
  ) {
    this.socketService.checkIfUserIsOnTheList();

  }


  ionViewDidLoad() {
/*    this.showLoader();
    this.firebaseService.checkAuthentication().then((res) => {
      this.loading.dismiss();
      this.firebaseService.checkUser()
        .subscribe(data => {
          this.IsPlayerAlreadyOnSocketList = this.socketService.IsPlayerAlreadyOnSocketList()
            .subscribe((status: any) => {
              if (status.connected == false) {
                this.socketService.connect();
                try {
                  this.checkUserSubscription.unsubscribe();
                  this.firebaseService.chechUnsubscribe();
                  this.IsPlayerAlreadyOnSocketList.unsubscribe();
                } catch (err) {

                }
                setTimeout(() => {

                  this.navCtrl.setRoot('TabsPage')
                }, 300)

              } else {
                try {
                  this.checkUserSubscription.unsubscribe();
                  this.firebaseService.chechUnsubscribe();
                  this.IsPlayerAlreadyOnSocketList.unsubscribe();
                } catch (err) {

                }

                console.log('already connected at another device')
              }

            })
                this.socketService.connect();
                this.navCtrl.setRoot('TabsPage');
        }, error => {
          if (error.error == 100) {
            this.firebaseService.chechUnsubscribe();
            let modal = this.modalCtrl.create('CreateUserModalPage', {});
            modal.present();
          }

        })
    }, error => {
      this.firebaseService.chechUnsubscribe();

      this.loading.dismiss();
    });*/
  }





  signInWithFacebook() {
    this.firebaseService.signInWithFacebook();

  }
  signUp() {
    this.showLoader();
    this.firebaseService.signUpWithEmailPassword(this.email, this.password).
      then(res => {
        this.firebaseService.checkAuthentication().then((res) => {
          console.log('User Authorized');
          console.log(res);
          this.loading.dismiss();
          setTimeout(() => {
            this.firebaseService.checkUser()
              .subscribe(data => {
                this.socketService.connect();
                this.navCtrl.setRoot('TabsPage');
              }, error => {
                if (error.error == 100) {
                  this.firebaseService.chechUnsubscribe();
                  let modal = this.modalCtrl.create('CreateUserModalPage', {});
                  modal.present();
                }
              })
          }, 10);
        }, error => {
          this.firebaseService.chechUnsubscribe();
          this.presentAlert(error.message);
          this.loading.dismiss();
        });
      }, error => {
        this.presentAlert(error.message);
        this.loading.dismiss();
      });;
  }

  signIn() {
    this.keyboard.close();
    if (this.keyboardShowed == true) {
      this.keyboard.close();
    }
    setTimeout(() => {
      this.showLoader();
      this.firebaseService.signInWithEmailPassword(this.email, this.password).
        then(res => {
          this.firebaseService.checkAuthentication().then((res) => {
            console.log('User Authorized');
            console.log(res);
            this.loading.dismiss();
            setTimeout(() => {
              this.checkUserSubscription = this.firebaseService.checkUser()
                .subscribe(data => {
                  this.IsPlayerAlreadyOnSocketList = this.socketService.IsPlayerAlreadyOnSocketList()
                    .subscribe((status: any) => {
                      if (status.connected == false) {
                        this.socketService.connect();
                        try {
                          this.checkUserSubscription.unsubscribe();
                          this.firebaseService.chechUnsubscribe();
                          this.IsPlayerAlreadyOnSocketList.unsubscribe();
                        } catch (err) {

                        }

                        this.navCtrl.setRoot('TabsPage')
                      } else {
                        try {
                          this.checkUserSubscription.unsubscribe();
                          this.firebaseService.chechUnsubscribe();
                          this.IsPlayerAlreadyOnSocketList.unsubscribe();
                        } catch (err) {

                        }

                        console.log('already connected at another device')
                      }

                    })
                }, error => {
                  if (error.error == 100) {
                    this.firebaseService.chechUnsubscribe();
                    let modal = this.modalCtrl.create('CreateUserModalPage', {});
                    modal.present();
                  }
                })
            }, 10);
          }, error => {
            this.firebaseService.chechUnsubscribe();
            this.presentAlert(error.message);
            this.loading.dismiss();
          });
        }, error => {
          this.presentAlert(error.message);
          console.log(error);
          this.loading.dismiss();
        });
    }, 500);

  }

  presentAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }




}
