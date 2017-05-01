import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from  "socket.io-client";
import {Auth} from "./auth";
import {Observable} from "rxjs";
import {Stats} from "../models/stats";
import {Arenas} from "../models/arenas";
import {Question} from "../models/question";

/*
  Generated class for the Sockets provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Sockets{
  private socket:any=io('http://localhost:3000',{query:{userId:this.authService.userId}});



  constructor(public http: Http,
              private authService:Auth) {


    }

   connect(){
    let socket = this.socket;
    const token=this.authService.token;
     socket.on('connect',()=>{

/*
       socket.removeAllListeners('authenticated');
*/
       socket.emit('authentication', {token:token});
       socket.on('authenticated', function() {

       });
       socket.on('unauthorized', function(err){
         console.log("There was an error with the authentication:", err.message);

       });
     });
   }

   //////////////////////req-get stats///////////////////////

  reqStats(userId){

    this.socket.emit('getStats',{userId:userId});


  }

   getStats(){
     this.socket.removeAllListeners('loadStats');
     let obsevable=new Observable((observer:any)=>{
       this.socket.on('loadStats',(data:any)=>{
         const stats=data.obj;
         let  transFormedStats:Stats;
         transFormedStats=new Stats(stats.level,stats.currentExp,stats.wins,stats.loses);
         observer.next(transFormedStats);
       });
       return()=>{
         this.socket.disconnect();
       }
     });
     return obsevable;

   }

  //////////////////////req-get stats///////////////////////


////////////req-get arenas////////////////////////////


  reqArenas(userId){
    this.socket.emit('getArenas',{userId:userId});

  }

  getArenas(){
    this.socket.removeAllListeners('loadArenas');
    let observable=new Observable((observer:any)=>{
      this.socket.on('loadArenas',(data:any)=>{
        const arenas=data.obj;

        let transformedArenas: Arenas[] = [];
        for (let arena of arenas) {

          transformedArenas.push(new Arenas(
            arena._id,
            arena.user ,
            arena.invite._id,
            arena.status_accept,
            arena.user.userName || arena.invite.userName,
            arena.user_played,
            arena.invite_played,

          ));
        }
        const UserArenas=data.objUser;
        for (let userArena of UserArenas){

          transformedArenas.push(new Arenas(
            userArena._id,
            userArena.user._id ,
            userArena.invite,
            userArena.status_accept,
            userArena.user.userName,
            userArena.user_played,
            userArena.invite_played,
          ));
        }
        observer.next(transformedArenas);
      });
      return()=>{
        this.socket.disconnect();
      }
    })
    return observable;
  }

////////////req-get arenas////////////////////////////


//////////start-req-get Questions////////////////////////////

  reqQuestions(userId,arenaId){
    this.socket.emit('getQuestions',{userId:userId,arenaId:arenaId})
  }
  getQuestions(){
    this.socket.removeAllListeners('getQuestions');
    let observable=new Observable((observer:any)=>{
      this.socket.on('loadQuestions',(data:any)=>{
        const questions=data.obj;

        let transFormedQuestions:Question[]=[];
        for (let question of questions){
          transFormedQuestions.push(new Question(
            question.question,
            question.optiona,
            question.optionb,
            question.optionc,
            question.optiond,
            question.answer,
            question._id

          ));
        }
        observer.next(transFormedQuestions)
      });
      return()=>{
        this.socket.disconnect();
      }

    });
    return observable

  }






////////////end-req-get Questions////////////////////////////
}
