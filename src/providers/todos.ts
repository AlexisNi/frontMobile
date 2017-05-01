import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Todos {

  constructor(public http: Http, public authService: Auth) {

  }

  getTodos(){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('http://localhost:3000/api/todos', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createTodo(todo){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('http://localhost:3000/api/todos', JSON.stringify(todo), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deleteTodo(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('http://localhost:3000/api/todos/' + id, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }


}
