import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsModalPage } from './statistics-modal';
import { TabsPage } from "./tabs";

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],
  exports: [
    TabsPage
  ]
})
export class TabsPageModule {}
