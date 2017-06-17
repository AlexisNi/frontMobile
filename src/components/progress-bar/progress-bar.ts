import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

/*
  Generated class for the ProgressBar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent implements OnChanges {

  @Input('progress') progress;
  @Input() level = 1;
  @Input() currentExp;
  @Input() experienceNextLevel;
  
  text: string;

  constructor() { }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['level']) {
      this.level = changes['level'].currentValue;
      
    }
   
  }

}
