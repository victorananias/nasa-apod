import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() itemsCount = 0;
  @Input() imgsDownloaded = 0;

  constructor(
    private decimal: DecimalPipe
  ) { }

  ngOnInit() {
  }

  get percentage() {
    return `${ this.decimal.transform((100 * this.imgsDownloaded) / this.itemsCount, '1.0-0') }`;
  }

  get percentageClass() {
    return 'p' + this.percentage;
  }

}
