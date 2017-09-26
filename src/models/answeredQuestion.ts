/**
 * Created by alex on 07/03/2017.
 */
export  class AnsweredQuestion{
  questionId:string;
  answer:Boolean;
  time:number;



  constructor(questionId:string,answer:Boolean,time:number){

    this.questionId=questionId;
    this.answer=answer;
    this.time=time;
  }


}
