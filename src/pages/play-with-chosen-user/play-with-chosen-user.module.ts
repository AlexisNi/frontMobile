import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayWithChosenUserPage } from './play-with-chosen-user';
import { SharedModule } from "../../app/shared.module";
import { GameListComponent } from "../../components/game-list/game-list";
import { GameItemComponent } from "../../components/game-item/game-item";

@NgModule({
  declarations: [
    PlayWithChosenUserPage


  ],
  imports: [
    IonicPageModule.forChild(PlayWithChosenUserPage),
    SharedModule
  ],
  exports: [
    PlayWithChosenUserPage
  ]
})
export class PlayWithChosenUserPageModule { }
