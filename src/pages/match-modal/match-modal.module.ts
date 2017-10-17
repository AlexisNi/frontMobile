import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchModalPage } from './match-modal';
/*import { TimerComponent } from "../../components/timer/timer";
*/
@NgModule({
  declarations: [
    MatchModalPage,
    /*TimerComponent*/
  ],
  imports: [
    IonicPageModule.forChild(MatchModalPage),
  ],
  exports: [
    MatchModalPage
  ]
})
export class MatchModalPageModule {}
