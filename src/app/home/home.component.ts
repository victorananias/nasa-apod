import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from '../images.service';
import { Media } from '../media.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mediaList: Media[] = [];
  date = new Date();
  loadingMessage = 'Starting App';
  imgsReady = false;
  maxItems = 15;

  maxColumnWidth = 400;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private service: AppService,
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
    this.date.setHours(0);

    this.imagesService.imagesLoaded.subscribe((mediaList: Media[]) => {
      this.mediaList = mediaList;
      this.imgsReady = true;
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        this.loadingMessage = 'Connecting to Nasa';
        if (params.date) {
          this.date = new Date(params.date);
        }

        this.loadImages();
    });
  }

  loadImages() {
    this.imgsReady = false;

    this.service.getMediaList({
      start_date: this.startDate,
      end_date: this.endDate
    })
    .subscribe((mediaList: Media[]) => {
      this.imagesService.loadImages(mediaList);
    });
  }

  next() {
    this.nextDate();
    this.loadImages();
  }

  previous() {
    this.previousDate();
    this.loadImages();
  }

  // getMediaList() {
  //   this.loadingMessage = 'Connecting to Nasa';
  //   this._downloadedImgs = 0;

  //   this.service.getMediaList({
  //     start_date: this.formatDate(this.startDate) ,
  //     end_date: this.formatDate(this.endDate)
  //   }).subscribe((mediaList: Media[]) => {
  //       this.mediaList = mediaList.sort((a, b) => b.date.localeCompare(a.date));
  //       this.downloadImages();
  //   }, error => {
  //     console.error(error);
  //     this.loadingMessage = 'Connection Failed.';
  //   });
  // }

  // onMediaSelected(media) {
  //   this.service.setMedia(media);
  //   this.router.navigate(['/', media.date]);
  // }

  get startDate() {
    const date = new Date(this.formatDate(this.date));
    date.setDate(this.date.getDate() + 1 - this.maxItems);
    return this.formatDate(date);
  }

  get endDate() {
    return this.formatDate(this.date);
  }

  get downloadedImgs() {
    return this.imagesService.downloadedImgs;
  }

  // private loadImages() {
  //   this.mediaList.map(media => {
  //     if (media.media_type === 'video') {
  //       media.src = this.youtubeImage( media.url);
  //     } else {
  //       media.src = media.url;
  //     }
  //     return media;
  //   });

  // }

  private nextDate() {
    this.date.setDate(this.date.getDate() + this.maxItems + 1);
  }

  private previousDate() {
    this.date.setDate(this.date.getDate() - this.maxItems + 1);
  }

  private formatDate(date) {
    date.setDate(date.getDate());
    return this.datePipe.transform(
      date,
      'yyyy-MM-dd'
    );
  }
}
