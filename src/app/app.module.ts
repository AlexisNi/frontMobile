import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth";
import {ArenaPage} from "../pages/arena/arena";
import {Auth} from "../providers/auth";
import {Todos} from "../providers/todos";
import { Storage } from '@ionic/storage';
import {Sockets} from "../providers/sockets";
import {Arena} from "../providers/arena";
import {StartingPage} from "../providers/starting-page";
import {StartingPagePage} from "../pages/starting-page/starting-page";
import {TabsPage} from "../pages/tabs/tabs";
import {FirstPage} from "../pages/first/first";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar";
import {GameListComponent} from "../components/game-list/game-list";
import {GameItemComponent} from "../components/game-item/game-item";
import {MatchPage} from "../pages/match/match";
import {Questions} from "../providers/questions";
import {MyArenasPage} from "../pages/my-arenas/my-arenas";
import {MyProfilePage} from "../pages/my-profile/my-profile";

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
    MyProfilePage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    MyProfilePage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}
  ,AuthService,Auth,Todos,Storage,Sockets,Arena,StartingPage,Questions]
})
export class AppModule {}
