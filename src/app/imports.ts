import { ProgressBarComponent } from "../components/progress-bar/progress-bar";
import { AuthService } from "../services/auth";
import { Auth } from "../providers/auth";
import { Todos } from "../providers/todos";
import { Sockets } from "../providers/sockets";
import { Arena } from "../providers/arena";
import { StartingPage } from "../providers/starting-page";
import { Questions } from "../providers/questions";
import { Facebook } from "@ionic-native/facebook";
import { FirebaseServiceProvider } from "../providers/firebase-service/firebase-service";
import { Keyboard } from '@ionic-native/keyboard';
import { HistoricDataProvider } from "../providers/historic-data";
import { LeaderBoardsProvider } from "../providers/leader-boards/leader-boards";
import { FCM } from '@ionic-native/fcm';
import { HintsProvider } from "../providers/hints/hints";
import { AdMobPro } from '@ionic-native/admob-pro';


export const COMPONENTS = [
    ProgressBarComponent
];

export const PROVIDERS = [
    AuthService,
    Auth,
    Todos,
    Sockets,
    Arena,
    StartingPage,
    Questions,
    Facebook,
    FirebaseServiceProvider,
    Keyboard,
    HistoricDataProvider,
    LeaderBoardsProvider,
    FCM,
    HintsProvider,
    AdMobPro
    
    
]