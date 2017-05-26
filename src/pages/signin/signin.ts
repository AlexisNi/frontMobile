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

  constructor(public navCtrl: NavController,
    public authService: Auth,
    public loadingCtrl: LoadingController,
  ) {

  }

  ionViewDidLoad() {

    this.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });

  }

  login() {

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      setTimeout(() => {
        this.navCtrl.setRoot(TabsPage);
      }, 10);

    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });

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


}
