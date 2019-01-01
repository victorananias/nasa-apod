import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from '../images.service';
import { Media } from '../media.model';
import { PercentageLoaderService } from '../shared/percentage-loader/percentage-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mediaList: Media[] = [];
  date = new Date();
  totalItems = 15;
  maxColumnWidth = 400;
  loadingMessage = 'Starting App';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private service: AppService,
    private imagesService: ImagesService,
    private loaderService: PercentageLoaderService
  ) { }

  ngOnInit() {
    this.imagesService.imagesLoaded.subscribe((mediaList: Media[]) => {
      console.log('imagesLoaded event');
      this.mediaList = mediaList;
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
    this.previousDate();
    this.loadImages();
  }

  next() {
    this.nextDate();
    this.loadImages();
  }

  onMediaSelected(media) {
    this.service.setMedia(media);
    this.router.navigate(['/', media.date]);
  }

  get startDate() {
    const date = new Date(this.endDate);
    console.log(date.getDate() + 1);
    
    date.setDate(17);
    return this.formatDate(date);
  }

  get endDate() {
    this.date.setHours(0);
    return this.formatDate(this.date);
  }

  private nextDate() {
    this.date.setDate(this.date.getDate() + this.totalItems + 1);
  }

  private previousDate() {
    this.date.setDate(this.date.getDate() - this.totalItems + 1);
  }

  private formatDate(date) {
    date.setDate(date.getDate());
    return this.datePipe.transform(
      date,
      'yyyy-MM-dd'
    );
  }
}
