export class Awards {
    constructor(
        public userId: string,
        public experience: number,
        public points: number,
        public correctAnswers: number,
        public received:boolean,
        public message?:string) {
    }

}