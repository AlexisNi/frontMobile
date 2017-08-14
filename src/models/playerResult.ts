import { Awards } from "./awards";

export class PlayerResult {
    constructor(public winnerUserId: string,
        public WinnerLastName: string,
        public loserUserId: string,
        public loserLasName: string,
        public winnerAward: Awards,
        public loserAward: Awards,
        public drawAward?: Awards,
        public draw?: boolean) {
    }

}
