import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
import { Media } from '../media.model';

@Component({
  selector: 'app-picture-of-the-day',
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.css']
})
export class PictureOfTheDayComponent implements OnInit {
  media: Media;
  date;
  @ViewChild('imagem') imagem: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: AppService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (!(this.date = params.date)) {
        this.date = this.datePipe.transform((new Date), 'yyyy-MM-dd');
      }

      this.getMedia();
    });
  }

  private getMedia() {
    this.service.getMedia(this.date)
      .subscribe((media: Media) => {
        media = new Media(media);

        const image = new Image;

        image.src = media.src;

        image.onload = () => {
          this.imagem.nativeElement.src = image.src;
        };

      }, erro => this.router.navigate(['/']));
  }
}
