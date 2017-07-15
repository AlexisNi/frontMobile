import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from "../../providers/auth";
import { SignupPage } from "../signup/signup";
import { ArenaPage } from "../arena/arena";
import { HomePage } from "../home/home";
import { StartingPagePage } from "../starting-page/starting-page";
import { FirstPage } from "../first/first";
import { MatchPage } from "../match/match";
import { TabsPage } from "../tabs/tabs";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform, ModalController, AlertController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { CreateUserModalPage } from "../create-user-modal/create-user-modal";


/*
  Generated class for the Signin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.firebaseService.chechUnsubscribe();
  }
  ngOnInit(): void {


  }

  email: string = '';
  password: string = '';
  loading: any;
  displayName;


  constructor(public navCtrl: NavController,
    public authService: Auth,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform,
    public alertCtrl: AlertController,
    private firebaseService: FirebaseServiceProvider,
    private modalCtrl: ModalController
  ) {
  }


  ionViewDidLoad() {
    this.showLoader();
    this.firebaseService.checkAuthentication().then((res) => {
      this.loading.dismiss();
        this.firebaseService.checkUser()
          .subscribe(data => {
            this.navCtrl.setRoot(MatchPage);
          }, error => {
            if (error.error == 100) {
              this.firebaseService.chechUnsubscribe();
              let modal = this.modalCtrl.create(CreateUserModalPage, {});
              modal.present();
            }

          })
    }, error => {
      this.firebaseService.chechUnsubscribe();
      console.log(error);
      this.loading.dismiss();
    });
  }
  login() {

  }

  launchSignup() {
    this.navCtrl.push(SignupPage);
  }


  signInWithFacebook() {
  this.firebaseService.signInWithFacebook();

  }
  signUp() {
    this.showLoader();
    this.firebaseService.signUpWithEmailPassword(this.email, this.password).
      then(res => {
        this.loading.dismiss();
        let modal = this.modalCtrl.create(CreateUserModalPage, {});
        modal.present();
      }, error => {
        this.presentAlert(error.message);
        this.loading.dismiss();
      });;
  }

  signIn() {
    this.showLoader();
    this.firebaseService.signInWithEmailPassword(this.email, this.password).
      then(res => {
        this.firebaseService.checkAuthentication().then((res) => {
          console.log('User Authorized');
          console.log(res);
          this.loading.dismiss();
          setTimeout(() => {
            this.firebaseService.checkUser()
              .subscribe(data => {
                this.navCtrl.setRoot(TabsPage);
              }, error => {
                if (error.error == 100) {
                  this.firebaseService.chechUnsubscribe();
                  let modal = this.modalCtrl.create(CreateUserModalPage, {});
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
