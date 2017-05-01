/**
 * Created by alex on 13/02/2017.
 */
import firebase from 'firebase';
export class AuthService{
  signUp(email:string,password:string){
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }
  signIn(email:string,password:string){
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  logout(){
    firebase.auth().signOut();
  }

  getActivateUser(){
    return firebase.auth().currentUser;
  }





}
