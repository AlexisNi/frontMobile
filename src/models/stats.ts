interface streak{
    currentStreak:number;
    longestStreak:number;
}
export class Stats{
    constructor(
        public level:number,
        public currentExp:number,
        public wins:number,
        public loses:number,
        public draws?:number,
        public winningStreak?:streak,
        public losingStreak?:streak,
        public drawStreak?:streak
         ){
    }

}
