import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from "./shared.module";
import { PROVIDERS } from "./imports";
import { HintsProvider } from '../providers/hints/hints';




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
    MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    SharedModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    

  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
  PROVIDERS,
    HintsProvider],


})
export class AppModule { }
