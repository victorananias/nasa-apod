import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  mediaList: Media[] = [];
  columns: Media[][] = [];
  constructor(
    private service: AppService
  ) { }

  ngOnInit() {
    this.service.getMedia({start_date: '2018-11-11'})
      .subscribe((mediaList: Media[]) => {
        console.log(mediaList);

        this.mediaList = mediaList;
        this.generateColumns();
      });
  }

  generateColumns() {
    let p = 0;
    this.columns[p] = [];
    for (let i = 0; i < this.mediaList.length; i++ ) {
      this.columns[p].push(this.mediaList[i]);
      if ((i + 1) % 5 === 0 && i + 1 !== this.mediaList.length) {
        p++;
        this.columns[p] = [];
      }
    }
  }


}
