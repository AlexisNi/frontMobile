import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController} from 'ionic-angular';
import {Auth} from "../../providers/auth";
import {StartingPage} from "../../providers/starting-page";


/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  role: string;
  email: string;
  userName:string;
  password: string;
  loading: any;


  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  register(){

    this.showLoader();

    let details = {
      email: this.email,
      password: this.password,
      role: this.role,
      userName:this.userName
    };

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(StartingPage);
    }, (err) => {
      this.loading.dismiss();
    });

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
}
