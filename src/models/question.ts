/**
 * Created by alex on 18/10/2016.
 */
export  class Question{
  questionId:string;
  question:string;
  optiona:string;
  optionb:string;
  optionc :string;
  optiond:string;
  answer:string;
  isplayed:boolean;


  constructor(question:string,optionA:string,optionB:string,optionC:string,optionD:string,answer:string,questionId:string,isplayed?:boolean){
    var optionOptionArray=[optionA,optionB,optionC,optionD];





    for (let i = optionOptionArray.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [optionOptionArray[i - 1], optionOptionArray[j]] = [optionOptionArray[j], optionOptionArray[i - 1]];
    }
    this.optiona=optionOptionArray[0];
    this.optionb=optionOptionArray[1];
    this.optionc=optionOptionArray[2];
    this.optiond=optionOptionArray[3];
    this.questionId=questionId;
    this.question=question;
    this.answer=answer;
    this.isplayed=true;

  }
}
