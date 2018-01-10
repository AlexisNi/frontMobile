import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadingScreenPage } from './loading-screen';

@NgModule({
  declarations: [
    LoadingScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadingScreenPage),
  ],
  exports: [
    LoadingScreenPage
  ]
})
export class LoadingScreenPageModule {}
