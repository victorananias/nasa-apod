import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  @Input() percentage = 0;

  constructor() { }

  ngOnInit() {
  }

  get percentageClass() {
    return `p${this.percentage}`;
  }

  get over50() {
    return this.percentage > 50;
  }

}
