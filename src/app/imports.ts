import { ProgressBarComponent } from "../components/progress-bar/progress-bar";
import { AuthService } from "../services/auth";
import { Auth } from "../providers/auth";
import { Todos } from "../providers/todos";
import { Sockets } from "../providers/sockets";
import { Arena } from "../providers/arena";
import { StartingPage } from "../providers/starting-page";
import { Questions } from "../providers/questions";
import { Facebook } from "@ionic-native/facebook";
import { Push } from "@ionic-native/push";
import { FirebaseServiceProvider } from "../providers/firebase-service/firebase-service";
import { Keyboard } from '@ionic-native/keyboard';
import { HistoricDataProvider } from "../providers/historic-data";
import { LeaderBoardsProvider } from "../providers/leader-boards/leader-boards";


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
    Push,
    FirebaseServiceProvider,
    Keyboard,
    HistoricDataProvider,
    LeaderBoardsProvider
]