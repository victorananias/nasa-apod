import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.css']
})
export class MosaicComponent implements OnInit {
  @Input() list = [];
  @Input() maxColumnWidth;
  @Output() itemSelected: EventEmitter<Object> = new EventEmitter<Object>();
  private columnsNumber = 3;

  constructor() { }

  ngOnInit() {
    this.resize(window.innerWidth);
  }

  get columns() {
    const columns = [];
    for (let column = 0; column < this.columnsNumber; column++) {
      columns[column] = [];
    }

    if (columns === []) {
      return;
    }

    for (let i = 0; i < this.list.length; i++) {
      const column = ((i + 1) % this.columnsNumber || this.columnsNumber) - 1;
      columns[column].push(this.list[i]);
    }

    return columns;
  }

  get flex () {
    return (100 / this.columnsNumber) + '%';
  }

  onSelectItem(item) {
    this.itemSelected.emit(item);
  }

  onResize(event) {
    const windowWidth = event.target.innerWidth;
    this.resize(windowWidth);
  }

  private resize(windowWidth) {
    this.columnsNumber = Math.round(windowWidth / this.maxColumnWidth);
  }

}
