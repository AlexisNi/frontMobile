import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { COMPONENTS } from "./imports";

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    COMPONENTS
  ]
})

export class SharedModule { }
