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
    this.resize(window.innerWidth);
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

  loadPictures() {
    this.service.getMedia({
      start_date: this.datePipe.transform(this.startDate, 'yyyy-MM-dd') ,
      end_date: this.datePipe.transform(this.endDate, 'yyyy-MM-dd') ,
    }).subscribe((mediaList: Media[]) => {

        let counter = 1;

        this.mediaList = mediaList.sort((a, b) => b.date.localeCompare(a.date)).map((media) => {

          const image = new Image();

          if (media.media_type === 'video') {
            image.src = this.youtubeImage( media.url);
          } else {
            image.src = media.url;
          }

          image.onload = () => {
            media.image = image;
            console.log('carregou', counter++);
          };

          return media;
        });

        this.generateColumns();
    });
  }

  generateColumns() {
    const p = 0;
    this.columns = [];
    this.columns[p] = [];

    for (let column = 0; column < this.columnsNumber; column++) {
      this.columns[column] = [];
    }

    for (let i = 0; i < this.mediaList.length; i++) {
      const column = ((i + 1) % this.columnsNumber || this.columnsNumber) - 1;
      this.columns[column].push(this.mediaList[i]);
    }
  }

  youtubeImage(url) {
    const regExp = /embed\/([^)]+)\?/;
    const matches = regExp.exec(url);
    // const matches = regExp.exec('https://www.youtube.com/embed/B1R3dTdcpSU?rel=0');

    const videoId = matches[1];
    const thumbnailName = 'maxresdefault.jpg';
    return `https://img.youtube.com/vi/${videoId}/${thumbnailName}`;
  }

  get startDate() {
    return  this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  get endDate() {
    const date = new Date(this.startDate);

    date.setDate(this.date.getDate() + this.itemsCount - 1);

    return  this.datePipe.transform(
      date,
      'yyyy-MM-dd'
    );
  }

  get flex () {
    return (100 / this.columnsNumber) + '%';
  }

  onResize(event) {
    const windowWidth = event.target.innerWidth;
    this.resize(windowWidth);
  }

  private nextDate() {
    this.date.setDate(this.date.getDate() + this.itemsCount + 1);
  }

  private previousDate() {
    this.date.setDate(this.date.getDate() - this.itemsCount + 1);
  }

  private resize(windowWidth) {
    if (windowWidth > 1200) {
      this.columnsNumber = 3;
    } else if (windowWidth < 1200 && windowWidth >  700) {
      this.columnsNumber = 2;
    } else if (windowWidth <  700) {
      this.columnsNumber = 1;
    }

    this.generateColumns();
  }


}
