import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  mediaList: Media[] = [];
  columns: Media[][] = [];
  constructor(
    private service: AppService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 14);
    console.log(this.datePipe.transform(date, 'yyyy-MM-dd') );

    this.service.getMedia({start_date: this.datePipe.transform(date, 'yyyy-MM-dd') })
      .subscribe((mediaList: Media[]) => {
        console.log(mediaList);

        this.mediaList = mediaList.sort((a, b) => b.date.localeCompare(a.date));
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

  youtubeImage(url) {
    const regExp = /embed\/([^)]+)\?/;
    const matches = regExp.exec(url);
    // const matches = regExp.exec('https://www.youtube.com/embed/B1R3dTdcpSU?rel=0');

    const videoId = matches[1];
    const thumbnailNumber = 'maxresdefault.jpg';
    return `http://img.youtube.com/vi/${videoId}/${thumbnailNumber}`;
  }


}
