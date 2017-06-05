import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the CreateUserModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-user-modal',
  templateUrl: 'create-user-modal.html',
})
export class CreateUserModalPage {
  loading: any;
  email;
  password;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseServiceProvider,
    public loadingCtrl: LoadingController, ) {
  }

  ionViewDidLoad() {

  }

  CreateUser(username) {
     this.showLoader();
    this.firebaseService.checkAuthentication()
      .then((res) => {
        this.firebaseService.createUser(username)
          .subscribe(data => {
            this.loading.dismiss();
            console.log(data);
            this.navCtrl.setRoot(TabsPage);
          },
          error => {
            this.loading.dismiss();
            console.log(error);
          })
      }, err => {
        this.loading.dismiss();
        console.log('user Not auth')
        console.log(err)
      })

  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }


}
