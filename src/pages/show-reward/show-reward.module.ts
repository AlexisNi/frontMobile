import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowRewardPage } from "./show-reward";
import { SharedModule } from "../../app/shared.module";



@NgModule({
  declarations: [
    ShowRewardPage


  ],
  imports: [
    IonicPageModule.forChild(ShowRewardPage),
    SharedModule
  ],
  exports: [
    ShowRewardPage
  ]
})
export class ShowRewardPageModule { }
