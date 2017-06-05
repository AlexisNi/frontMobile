import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, App } from 'ionic-angular';
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
  /*  loading: any;*/
  email;
  password;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
     public appCtrl: App,
    public viewCtrl: ViewController,
    public firebaseService: FirebaseServiceProvider,
    public loadingCtrl: LoadingController, ) {
  }

  ionViewDidLoad() {

  }

  CreateUser(username) {
    this.firebaseService.checkAuthentication()
      .then((res) => {
        this.firebaseService.createUser(username)
          .subscribe(data => {
            this.firebaseService.checkUser()
              .subscribe(data => {
               this.viewCtrl.dismiss();
                     this.appCtrl.getRootNav().push(TabsPage);

              }, error => {
                console.log(error);
              })
          },
          error => {
            console.log(error);
          })
      }, err => {
        console.log('user Not auth')
        console.log(err)
      })
  }
  ngOnDestroy(): void {
    this.firebaseService.chechUnsubscribe();
  }

  /*  showLoader() {
      this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
      });
  
      this.loading.present();
    }*/


}
