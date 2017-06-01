import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService:FirebaseServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserModalPage');
  }
  
  CreateUser(username){
    this.firebaseService.createUser(username)
    .subscribe(data=>{

    },
    error=>{
      console.log(error);
    })
    
    
  }
}
