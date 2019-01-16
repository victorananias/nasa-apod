import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Media } from '../media.model';

@Component({
  selector: 'app-picture-of-the-day',
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.css']
})
export class PictureOfTheDayComponent implements OnInit {
  media: Media;
  @ViewChild('imagem') imagem: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AppService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.service.getMedia(params.date)
      .subscribe((media: Media) => {
        this.media = media;
      }, erro => {});
    });
  }
}
