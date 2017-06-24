/**
 * Created by alex on 21/02/2017.
 */
import { Stats } from "../../models/stats";

export class UserFound {
  constructor(public message:string,public userName:string,public inviteId:string,public stats?:Stats){}
}
