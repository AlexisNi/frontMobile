import { Component, Input, OnChanges, SimpleChange, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

/*
  Generated class for the ProgressBar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent implements OnChanges, AfterViewInit {
  /*  @ViewChild('arc1') acr1: ElementRef;
    @ViewChild('arc2') arc2: ElementRef;*/

  arc1: any;
  arc2: any;

 @Input() x;
 @Input() y;
 @Input() cx;
 @Input() cy;
  r = 100;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.arc1 = this.describeArc(105, 105, 100, 0, 200)
      this.arc2 = this.describeArc(105, 105, 100, 0, 200)
    
    })
  }

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

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, radius, startAngle, endAngle) {

    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
  }


}
