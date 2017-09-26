interface streak{
    currentStreak:number;
    longestStreak:number;
}
export class StatisticsModal{
    constructor(
        public wins:number,
        public loses:number,
        public draws:number,
        public winningStreak:streak,
        public losingStreak:streak,
        public drawStreak:streak,
        public rightAnswer:number
         ){
    }

}
