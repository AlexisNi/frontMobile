import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaderBoardPage } from './leader-board';

@NgModule({
  declarations: [
    LeaderBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaderBoardPage),
  ],
  exports: [
    LeaderBoardPage
  ]
})
export class LeaderBoardPageModule {}
