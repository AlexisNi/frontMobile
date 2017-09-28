import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from "../../app/shared.module";
import { MyProfilePage } from "./my-profile";


@NgModule({
    declarations: [
        MyProfilePage
       

    ],
    imports: [
        IonicPageModule.forChild(MyProfilePage),
        SharedModule
    ],
    exports: [
        MyProfilePage
    ]
})
export class  MyProfilePageModule { }
