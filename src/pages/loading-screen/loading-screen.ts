import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, App } from 'ionic-angular';
import { Subscription } from "rxjs/Rx";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { Sockets } from "../../providers/sockets";

/**
 * Generated class for the LoadingScreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-loading-screen',
  templateUrl: 'loading-screen.html',
})
export class LoadingScreenPage {
  checkUserSubscription: Subscription;
  IsPlayerAlreadyOnSocketList: Subscription;
  loading: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseService: FirebaseServiceProvider,
    public loadingCtrl: LoadingController,
    public socketService: Sockets,
    private modalCtrl: ModalController,
    public appCtrl: App

  ) {
    this.socketService.checkIfUserIsOnTheList();
  }

  ionViewDidLoad() {
    this.showLoader();
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

              } else {/**/
                try {
                  this.checkUserSubscription.unsubscribe();
                  this.firebaseService.chechUnsubscribe();
                  this.IsPlayerAlreadyOnSocketList.unsubscribe();
                  this.appCtrl.getRootNav().push('SigninPage');
                } catch (err) {

                }

                console.log('already connected at another device')
              }

            })
          /*      this.socketService.connect();
                this.navCtrl.setRoot('TabsPage');*/
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
      this.appCtrl.getRootNav().push('SigninPage');
    });
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Checking users id...'
    });

    this.loading.present();

  }

}
