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

  itemsCount = 15;
  maxColumnWidth = 400;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private service: AppService,
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
    this.imagesService.imagesLoaded.subscribe((mediaList: Media[]) => {
      console.log(mediaList);
      this.mediaList = mediaList;
      this.imgsReady = true;
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.date) {
          this.date = new Date(params.date);
        }

        this.loadImages();
    });
  }

  loadImages() {
    this.service.getMediaList({
      start_date: this.startDate,
      end_date: this.endDate
    }).subscribe((mediaList: Media[]) => {
      this.imagesService.loadImages(mediaList);
    });
  }

  // next() {
  //   this.nextDate();
  //   this.getMediaList();
  // }

  // previous() {
  //   this.previousDate();
  //   this.getMediaList();
  // }

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
    date.setDate(this.date.getDate() - this.itemsCount);
    return this.formatDate(date);
  }

  get endDate() {
    return this.formatDate(this.date);
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

  // private nextDate() {
  //   this.date.setDate(this.date.getDate() + this.itemsCount + 1);
  // }

  // private previousDate() {
  //   this.date.setDate(this.date.getDate() - this.itemsCount + 1);
  // }

  private formatDate(date) {
    date.setDate(date.getDate());
    return this.datePipe.transform(
      date,
      'yyyy-MM-dd'
    );
  }
}
