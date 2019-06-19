import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from '../images.service';
import { Media } from '../media.model';
import { PercentageLoaderService } from '../shared/percentage-loader/percentage-loader.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  mediaList: Media[] = [];
  endDate;
  maxColumnWidth = 400;
  loadingMessage = 'Starting App'; 
  private _totalItems = 30;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AppService,
    private imagesService: ImagesService,
    private loaderService: PercentageLoaderService
  ) { }

  ngOnInit() {
    this.imagesService.imagesLoaded.subscribe((mediaList: Media[]) => {
      this.mediaList = mediaList;
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        this.endDate = params.date;

        if (!this.endDate) {
          this.endDate = moment().format('YYYY-MM-DD');
        }

        this.loadImages();
      });
  }

  previous() {
    this.navigateToDate(moment(this.endDate).subtract(this.totalItems, 'days').format('YYYY-MM-DD'));
  }

  next() {
    if (moment(this.endDate).add(this.totalItems, 'days').diff(moment(), 'days') > 0) {
      return;
    }

    this.navigateToDate(moment(this.endDate).add(this.totalItems, 'days').format('YYYY-MM-DD'));
  }

  onMediaSelected(media) {
    this.service.setMedia(media);
    this.router.navigate(['/', media.date]);
  }

  get startDate() {
    return moment(this.endDate)
      .subtract(this.totalItems - 1, 'days')
      .format('YYYY-MM-DD');
  }

  get totalItems() {
    return this._totalItems;
  }

  private navigateToDate(date: string) {
    this.router.navigate(['/'], { queryParams: { date } });
  }

  private loadImages() {
    this.loadingMessage = 'Connecting to Nasa';


    this.loaderService.show();

    this.service.getMediaList({
      start_date: this.startDate,
      end_date: this.endDate
    })
    .subscribe((mediaList: Media[]) => {
      this.loadingMessage = 'Loading Images';
      
      this.loaderService.totalItems = mediaList.length;

      this.imagesService.loadImages(mediaList);
    }, error => {
      this.loadingMessage = 'Connection Failed';
    });
  }
}
