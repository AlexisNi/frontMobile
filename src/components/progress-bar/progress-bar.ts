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
  @ViewChild('circle') circle: ElementRef;


  arc1: any;
  arc2: any;
  @Input('progress') progress;
  @Input() level = 1;
  @Input() currentExp;
  @Input() experienceNextLevel;
  @Input() exp = 10;
  @Input() cx;
  @Input() cy;
  r = 100;






  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calucalteProgress();


    })
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['currentExp']) {
      this.currentExp = changes['currentExp'].currentValue;

    }
    if (changes['level']) {
      this.level = changes['level'].currentValue;

    }
    if (changes['progress']) {
      this.progress = changes['progress'].currentValue;
      this.exp = (360 * this.progress) / 100;
      this.calucalteProgress();
      if (this.exp > 359) {
        this.exp = 359;
        this.calucalteProgress();

      } else if (this.exp < 0) {
        this.exp = 0;
        this.calucalteProgress();
      }

    }
  }

  calucalteProgress() {
    let radius = this.circle.nativeElement.getBoundingClientRect().height / 2;
    this.cx = this.circle.nativeElement.cx.animVal.value;
    this.cy = this.circle.nativeElement.cy.animVal.value;

    this.arc1 = this.describeArc(this.cx, this.cy, radius, 0, this.exp)
    this.arc2 = this.describeArc(this.cx, this.cy, radius, 0, this.exp)

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
