import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerComponent } from "../../components/timer/timer";
import { MatchPage } from "./match";

@NgModule({
  declarations: [
    MatchPage,
    TimerComponent
  ],
  imports: [
    IonicPageModule.forChild(MatchPage),
  ],
  exports: [
    MatchPage
  ]
})
export class MatchPageModule {}
