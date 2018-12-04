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
  date =  new Date();
  itemsCount = 15;
  columnsNumber = 3;

  constructor(
    private service: AppService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.previous();
  }

  next() {
    this.nextDate();
    this.loadPictures();
  }

  previous() {
    this.previousDate();
    this.loadPictures();
  }

  private nextDate() {
    this.date.setDate(this.date.getDate() + this.itemsCount);
  }

  private previousDate() {
    this.date.setDate(this.date.getDate() - this.itemsCount);
  }

  loadPictures() {
    this.service.getMedia({
      start_date: this.datePipe.transform(this.startDate, 'yyyy-MM-dd') ,
      end_date: this.datePipe.transform(this.endDate, 'yyyy-MM-dd') ,
    }).subscribe((mediaList: Media[]) => {
        this.mediaList = mediaList.sort((a, b) => b.date.localeCompare(a.date));
        this.generateColumns();
    });
  }

  generateColumns() {
    const p = 0;
    this.columns = [];
    this.columns[p] = [];

    for (let column = 0; column < this.columnsNumber; column++ ) {
      this.columns[column] = [];
    }

    for (let i = 0; i < this.mediaList.length; i++ ) {
      const column = ((i + 1) % this.columnsNumber || this.columnsNumber) - 1;
      this.columns[column].push(this.mediaList[i]);
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

  get startDate() {
    return  this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  get endDate() {
    const date = new Date(this.startDate);

    date.setDate(this.date.getDate() + this.itemsCount );

    return  this.datePipe.transform(
      date,
      'yyyy-MM-dd'
    );
  }

  resize(event) {
    const windowWidth = event.target.innerWidth;
    if (windowWidth > 1200) {
      console.log('opa 1');

      this.columnsNumber = 3;
    } else if (windowWidth < 1200 && windowWidth >  700) {
      console.log('opa 2');
      this.columnsNumber = 2;
    } else if (windowWidth <  700) {
      console.log('opa 3');
      this.columnsNumber = 1;
    }

    this.generateColumns();
  }

  get flex () {
    return (100 / this.columnsNumber) + '%';
  }


}
