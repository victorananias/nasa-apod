import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() maxItems;
  @Input() downloadedImgs;
  @Input() hide = false;

  constructor(
    private decimal: DecimalPipe
  ) { }

  ngOnInit() {
  }

  get percentage() {
    return +this.decimal.transform((100 * this.downloadedImgs) / this.maxItems, '1.0-0');
  }

}
