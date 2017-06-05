import { Component, OnInit } from '@angular/core';
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
import { Platform, ModalController } from 'ionic-angular';
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
export class SigninPage implements OnInit {
  ngOnInit(): void {


  }

  email: string;
  password: string;
  loading: any;
  displayName;


  constructor(public navCtrl: NavController,
    public authService: Auth,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform,
    private firebaseService: FirebaseServiceProvider,
    private modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.showLoader();
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
              let modal = this.modalCtrl.create(CreateUserModalPage, {});
              modal.present();
            }

          })
      }, 10);
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

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  signInWithFacebook() {
    this.firebaseService.signInWithFacebook();

  }
  sendRandompost() {
    this.firebaseService.firebaseAuth()
      .subscribe();
  }
  signUp() {
    this.showLoader();
    this.firebaseService.signUpWithEmailPassword(this.email, this.password).
      then(res => {
              let modal = this.modalCtrl.create(CreateUserModalPage, {});
              modal.present();
    /*    setTimeout(() => {
          this.firebaseService.checkUser()
            .subscribe(data => {
             this.loading.dismiss();
              this.navCtrl.setRoot(TabsPage)
            }, error => {
              console.log(error);
              let modal = this.modalCtrl.create(CreateUserModalPage, {email:this.email,password:this.password});
              modal.present();
            })
        }, 10);*/

      }, error => {
        console.log(error);
        this.loading.dismiss();
      });;

  }

  signIn() {
    this.showLoader();
    this.firebaseService.signInWithEmailPassword(this.email, this.password).
      then(res => {
        setTimeout(() => {
          this.firebaseService.checkUser()
            .subscribe(data => {
              this.loading.dismiss();
              this.navCtrl.setRoot(TabsPage);
            }, error => {
              if(error){
          if (error.error==100) {
              let modal = this.modalCtrl.create(CreateUserModalPage, {});
              modal.present();
            }
              }
            })
        }, 10);
      }, error => {
        console.log(error);
        this.loading.dismiss();
      });

  }



}
