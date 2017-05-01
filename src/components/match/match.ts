import { Component } from '@angular/core';

/*
  Generated class for the Match component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'match',
  templateUrl: 'match.html'
})
export class MatchComponent {

  text: string;

  constructor() {
    console.log('Hello Match Component');
    this.text = 'Hello World';
  }

}
