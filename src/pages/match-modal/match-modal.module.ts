import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchModalPage } from './match-modal';

@NgModule({
  declarations: [
    MatchModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchModalPage),
  ],
  exports: [
    MatchModalPage
  ]
})
export class MatchModalPageModule {}
