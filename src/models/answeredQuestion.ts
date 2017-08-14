/**
 * Created by alex on 07/03/2017.
 */
export  class AnsweredQuestion{
  questionId:string;
  answer:Boolean;



  constructor(questionId:string,answer:Boolean,){

    this.questionId=questionId;
    this.answer=answer;
  }


}
