import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { AuthService } from "../services/auth";
import { ArenaPage } from "../pages/arena/arena";
import { Auth } from "../providers/auth";
import { Todos } from "../providers/todos";
import { Sockets } from "../providers/sockets";
import { Arena } from "../providers/arena";
import { StartingPage } from "../providers/starting-page";
import { StartingPagePage } from "../pages/starting-page/starting-page";
import { TabsPage } from "../pages/tabs/tabs";
import { FirstPage } from "../pages/first/first";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar";
import { GameListComponent } from "../components/game-list/game-list";
import { GameItemComponent } from "../components/game-item/game-item";
import { MatchPage } from "../pages/match/match";
import { Questions } from "../providers/questions";
import { MyArenasPage } from "../pages/my-arenas/my-arenas";
import { MyProfilePage } from "../pages/my-profile/my-profile";
import { ShowRewardPage } from "../pages/show-reward/show-reward";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { CreateUserModalPageModule } from "../pages/create-user-modal/create-user-modal.module";
import { Push } from "@ionic-native/push";
import { TimerComponent } from '../components/timer/timer';
import { Keyboard } from '@ionic-native/keyboard';
import { HistoricDataProvider } from "../providers/historic-data";



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
    HomePage,
    SigninPage,
    SignupPage,
    ArenaPage,
    StartingPagePage,
    TabsPage,
    FirstPage,
    ProgressBarComponent,
    GameListComponent,
    GameItemComponent,
    MatchPage,
    MyArenasPage,
    MyProfilePage,
    ShowRewardPage,
    TimerComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    CreateUserModalPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ArenaPage,
    StartingPagePage,
    TabsPage,
    FirstPage,
    ProgressBarComponent,
    GameListComponent,
    GameItemComponent,
    MatchPage,
    MyArenasPage,
    MyProfilePage,
    ShowRewardPage

  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }
    , AuthService, Auth, Todos, Sockets, Arena, StartingPage, Questions,Facebook,Push,
    FirebaseServiceProvider,Keyboard,
    HistoricDataProvider]
})
export class AppModule { }
