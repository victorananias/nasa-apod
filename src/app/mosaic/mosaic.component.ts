import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.css']
})
export class MosaicComponent implements OnInit {
  @Input() list = [];
  @Input() columnsNumber;
  @Output() itemSelected: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    private service: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resize(window.innerWidth);
  }

  get columns() {
    const columns = [];
    for (let column = 0; column < this.columnsNumber; column++) {
      columns[column] = [];
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
    if (windowWidth > 1200) {
      this.columnsNumber = 3;
    } else if (windowWidth < 1200 && windowWidth >  700) {
      this.columnsNumber = 2;
    } else if (windowWidth <  700) {
      this.columnsNumber = 1;
    }
  }

}
