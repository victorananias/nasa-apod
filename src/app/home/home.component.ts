import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from '../images.service';
import { Media } from '../media.model';
import { PercentageLoaderService } from '../shared/percentage-loader/percentage-loader.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mediaList: Media[] = [];
  endDate;
  maxColumnWidth = 400;
  loadingMessage = 'Starting App';
  private _totalItems = 15;

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
        if (!params.date) {
          this.navigateToDate();
        }

        this.endDate = params.date;

        this.loadImages();
    });
  }

  loadImages() {
    if (this.invalidDate()) {
      return;
    }

    this.loadingMessage = 'Connecting to Nasa';

    this.loaderService.totalItems = this.totalItems;

    this.loaderService.show();

    this.service.getMediaList({
      start_date: this.startDate,
      end_date: this.endDate
    })
    .subscribe((mediaList: Media[]) => {
      this.imagesService.loadImages(mediaList);
    }, error => {
      console.error(error);
      this.loadingMessage = 'Connection Failed';
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

  private invalidDate() {
    if (this.endDate && moment().diff(Object.assign({}, this.endDate), 'days') <= 0) {
      this.navigateToDate(this.endDate);
      return;
    }

    return true;
  }

  private navigateToDate(date: string = moment().format('YYYY-MM-DD')) {
    this.router.navigate(['/'], { queryParams: { date } });
  }
}
