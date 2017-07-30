import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, App } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { TabsPage } from "../tabs/tabs";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

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
  showError = false;
  error: any;
  buttonDisabled = true;
  searchUser = new Subject<string>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public viewCtrl: ViewController,
    public firebaseService: FirebaseServiceProvider,
    public loadingCtrl: LoadingController, ) {
      
    const observable = this.searchUser
      .map(value => value)
      .debounceTime(300)
/*      .distinctUntilChanged()
*/      .flatMap((search) => {
        return Observable.of(search).delay(100);
      })
      .subscribe((data) => {
        this.CreateUser(data)
      });
  }

  ionViewDidLoad() {

  }

  CreateUser(username) {
    console.log(username);
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
            this.error = error.message;
            this.showError = true
            console.log(error);
          })

  }
  ngOnDestroy(): void {
    this.firebaseService.chechUnsubscribe();
  }
  onKey(event) {
    if (/\s/.test(event)) {
      this.showError = true
      this.buttonDisabled = true;
      this.error = 'White spaces doenst allowed,only numbers and letters are allowed'
    } else {
      this.buttonDisabled = false;
      this.showError = false;
      this.error = ''
    }
    if (!/^\w+$/.test(event) && event.length > 0) {
      this.showError = true
      this.buttonDisabled = true;
      this.error = 'White spaces doenst allowed,only numbers and letters are allowed'
    } else {
      this.buttonDisabled = false;
      this.showError = false;
      this.error = ''
    }
    if (event.length < 1) {
      this.buttonDisabled = true;
    }

  }

  /*  showLoader() {
      this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
      });
  
      this.loading.present();
    }*/


}
