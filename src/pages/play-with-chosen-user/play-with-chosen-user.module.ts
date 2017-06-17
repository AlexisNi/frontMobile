import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayWithChosenUserPage } from './play-with-chosen-user';

@NgModule({
  declarations: [
    PlayWithChosenUserPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayWithChosenUserPage),
  ],
  exports: [
    PlayWithChosenUserPage
  ]
})
export class PlayWithChosenUserPageModule {}
