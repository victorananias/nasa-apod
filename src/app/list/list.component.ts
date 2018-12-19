import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  mediaList: Media[] = [];
  date =  new Date();
  itemsCount = 15;
  columnsNumber = 3;
  loadingMessage = 'Connecting to Nasa';
  private _imgsDownloaded = 0;

  constructor(
    private router: Router,
    private service: AppService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.resize(window.innerWidth);
    this.previous();
  }

  next() {
    this.nextDate();
    this.getMedia();
  }

  previous() {
    this.previousDate();
    this.getMedia();
  }

  getMedia() {
    this.service.getMedia({
      start_date: this.datePipe.transform(this.startDate, 'yyyy-MM-dd') ,
      end_date: this.datePipe.transform(this.endDate, 'yyyy-MM-dd') ,
    }).subscribe((mediaList: Media[]) => {
        console.log(mediaList);
        this.loadingMessage  = 'Getting Resources';

        this.mediaList = mediaList.sort((a, b) => b.date.localeCompare(a.date));

        this.downloadImages();
    });
  }

  youtubeImage(url) {
    const regExp = /embed\/([^)]+)\?/;
    const matches = regExp.exec(url);
    // const matches = regExp.exec('https://www.youtube.com/embed/B1R3dTdcpSU?rel=0');

    const videoId = matches[1];
    const thumbnailName = 'maxresdefault.jpg';
    return `https://img.youtube.com/vi/${videoId}/${thumbnailName}`;
  }

  set imgsDownloaded(number) {
    this._imgsDownloaded = number;

    if (this._imgsDownloaded === this.itemsCount) {
      this.loadImages();
    }
  }

  get imgsDownloaded() {
    return this._imgsDownloaded;
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

  get columns() {
    const columns = [];
    for (let column = 0; column < this.columnsNumber; column++) {
      columns[column] = [];
    }

    for (let i = 0; i < this.mediaList.length; i++) {
      const column = ((i + 1) % this.columnsNumber || this.columnsNumber) - 1;
      columns[column].push(this.mediaList[i]);
    }

    return columns;
  }

  get imgsReady() {
    return this.itemsCount === this.imgsDownloaded;
  }

  onResize(event) {
    const windowWidth = event.target.innerWidth;
    this.resize(windowWidth);
  }

  private loadImages() {
    this.mediaList.map(media => {
      if (media.media_type === 'video') {
        media.src = this.youtubeImage( media.url);
      } else {
        media.src = media.url;
      }
      return media;
    });

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
  }

  private downloadImages() {
    this.mediaList.map((media) => {

      const image = new Image();

      if (media.media_type === 'video') {
        image.src = this.youtubeImage( media.url);
      } else {
        image.src = media.url;
      }

      image.onload = () => {
        this.imgsDownloaded++;
      };

      return media;
    });
  }

  selecionar(date) {
    this.router.navigate([date]);
  }


}
