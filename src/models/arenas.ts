import {Question} from "./question";
export  class Arenas{
  constructor(
    public arenaId:string,
    public userId:string,
    public inviteId:string,
    public status_accept?:boolean,
    public userName?:string,
    public user_played?:boolean,
    public invite_played?:boolean,
    public questions?:Question[],
    public correctNumber?:number){

  }
}
