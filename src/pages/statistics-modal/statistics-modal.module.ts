import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsModalPage } from './statistics-modal';

@NgModule({
  declarations: [
    StatisticsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(StatisticsModalPage),
  ],
  exports: [
    StatisticsModalPage
  ]
})
export class StatisticsModalPageModule {}
