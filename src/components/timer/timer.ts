import { Component, Input, SimpleChange } from '@angular/core';

/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {

  @Input('progress') progress;
  @Input() level = 1;
  text: string;

  constructor() { }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['level']) {
      this.level = changes['level'].currentValue;
      
    }
   
  }

}
