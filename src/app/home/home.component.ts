import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from '../images.service';
import { Media } from '../media.model';
import { PercentageLoaderService } from '../shared/percentage-loader/percentage-loader.service';
<<<<<<< HEAD
import { format, subDays, addDays, differenceInCalendarDays } from 'date-fns';
=======
import * as moment from 'moment';
>>>>>>> b0dd32eb996f4679c0a522963ab0611f597b3742

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mediaList: Media[] = [];
<<<<<<< HEAD
  date: Date;
=======
  endDate;
>>>>>>> b0dd32eb996f4679c0a522963ab0611f597b3742
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
<<<<<<< HEAD
          this.navigateToDate(new Date);
        }

        this.date = new Date(params.date);
=======
          this.navigateToDate();
        }

        this.endDate = params.date;
>>>>>>> b0dd32eb996f4679c0a522963ab0611f597b3742

        this.loadImages();
    });
  }

  loadImages() {
<<<<<<< HEAD
    this.checkDate();
=======
    if (this.invalidDate()) {
      return;
    }
>>>>>>> b0dd32eb996f4679c0a522963ab0611f597b3742

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
<<<<<<< HEAD
    const date = subDays(this.date, this.totalItems);
    return format(date, 'YYYY-MM-DD');
  }

  get endDate() {
    return format(this.date, 'YYYY-MM-DD');
  }

  get totalItems() {
    return this._totalItems - 1;
  }

  private checkDate() {
    if (this.date && differenceInCalendarDays(new Date, addDays(this.date, 15)) <= 0) {
      this.navigateToDate(new Date);
    }
  }

  private navigateToDate(date: Date) {
    this.router.navigate(['/'], { queryParams: { date: format(date, 'YYYY-MM-DD') } });
=======
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
>>>>>>> b0dd32eb996f4679c0a522963ab0611f597b3742
  }
}
