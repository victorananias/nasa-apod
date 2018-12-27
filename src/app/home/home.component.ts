import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mediaList: Media[] = [];
  date = new Date();
  itemsCount = 15;
  maxColumnWidth = 400;
  loadingMessage;
  private _imgsDownloaded = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private service: AppService,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.date) {
          this.date = new Date(params.date);
        }
    });

    this.previous();
  }

  next() {
    this.nextDate();
    this.getMediaList();
  }

  previous() {
    this.previousDate();
    this.getMediaList();
  }

  getMediaList() {
    this.loadingMessage = 'Connecting to Nasa';
    this._imgsDownloaded = 0;

    this.service.getMediaList({
      start_date: this.formatDate(this.startDate) ,
      end_date: this.formatDate(this.endDate)
    }).subscribe((mediaList: Media[]) => {
        this.mediaList = mediaList.sort((a, b) => b.date.localeCompare(a.date));
        this.downloadImages();
    }, error => {
      console.error(error);
      this.loadingMessage = 'Connection Failed.';
    });
  }

  onMediaSelected(media) {
    this.service.setMedia(media);
    this.router.navigate(['/', media.date]);
  }

  private youtubeImage(url) {
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
    return this.formatDate(this.date);
  }

  get endDate() {
    const date = new Date(this.startDate);

    date.setDate(this.date.getDate() + this.itemsCount - 1);

    return this.formatDate(date);
  }

  get imgsReady() {
    return this.itemsCount === this.imgsDownloaded;
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

  private downloadImages() {
    this.loadingMessage  = 'Getting Resources';

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

  private formatDate(date) {
    return this.datePipe.transform(
      date,
      'yyyy-MM-dd'
    );
  }
}
