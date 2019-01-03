import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from '../images.service';
import { Media } from '../media.model';
import { PercentageLoaderService } from '../shared/percentage-loader/percentage-loader.service';
import { format, subDays, addDays, differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mediaList: Media[] = [];
  date: Date;
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
          this.navigateToDate(new Date);
        }

        this.date = new Date(params.date);

        this.loadImages();
    });
  }

  loadImages() {
    this.checkDate();

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
    this.date = subDays(this.date, this.totalItems);
    this.navigateToDate(this.date);
  }

  next() {
    this.date = addDays(this.date, this.totalItems);
    this.navigateToDate(this.date);
  }

  onMediaSelected(media) {
    this.service.setMedia(media);
    this.router.navigate(['/', media.date]);
  }

  get startDate() {
    const date = subDays(this.date, this.totalItems - 1);
    return format(date, 'YYYY-MM-DD');
  }

  get endDate() {
    return format(this.date, 'YYYY-MM-DD');
  }

  get totalItems() {
    return this._totalItems;
  }

  private checkDate() {
    if (this.date && differenceInCalendarDays(new Date, addDays(this.date, 15)) <= 0) {
      this.navigateToDate(new Date);
    }
  }

  private navigateToDate(date: Date) {
    this.router.navigate(['/'], { queryParams: { date: format(date, 'YYYY-MM-DD') } });
  }
}
