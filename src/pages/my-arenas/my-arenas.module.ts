import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from "../../app/shared.module";
import { MyArenasPage } from "./my-arenas";
import { GameItemComponent } from "../../components/game-item/game-item";
import { GameListComponent } from "../../components/game-list/game-list";

@NgModule({
    declarations: [
        MyArenasPage,
        GameListComponent,
        GameItemComponent

    ],
    imports: [
        IonicPageModule.forChild(MyArenasPage),
        SharedModule
    ],
    exports: [
        MyArenasPage
    ]
})
export class MyArenasModule { }
