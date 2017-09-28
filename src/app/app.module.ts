import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ShowRewardPage } from "../pages/show-reward/show-reward";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CreateUserModalPageModule } from "../pages/create-user-modal/create-user-modal.module";
import { SharedModule } from "./shared.module";
import { TimerComponent } from "../components/timer/timer";
import { PROVIDERS } from "./imports";




export const firebaseConfig = {
   apiKey: "AIzaSyCrWyAINRGB_ahvyUq5aan3b0vKgyVgxrA",
    authDomain: "football-quiz-a9e1e.firebaseapp.com",
    databaseURL: "https://football-quiz-a9e1e.firebaseio.com",
    projectId: "football-quiz-a9e1e",
    storageBucket: "football-quiz-a9e1e.appspot.com",
    messagingSenderId: "327625743458"
};

@NgModule({
  declarations: [
    MyApp,
    ShowRewardPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    CreateUserModalPageModule,
    SharedModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShowRewardPage

  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
  PROVIDERS],


})
export class AppModule { }
