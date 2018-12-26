import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';

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
        this.date = this.datePipe.transform(( new Date), 'yyyy-MM-dd');
      }

      this.getMedia();
    });
  }

  private getMedia() {
    this.service.getMedia(this.date)
      .subscribe((media: Media) => {
        const image = new Image;
        if (media.media_type === 'video') {
          image.src = this.youtubeImage( media.url);
        } else {
          image.src = media.url;
        }

        image.onload = () => {
          this.imagem.nativeElement.src = image.src;
        };

      }, erro => this.router.navigate(['/']));
  }

  youtubeImage(url) {
    const regExp = /embed\/([^)]+)\?/;
    const matches = regExp.exec(url);
    // const matches = regExp.exec('https://www.youtube.com/embed/B1R3dTdcpSU?rel=0');

    const videoId = matches[1];
    const thumbnailName = 'maxresdefault.jpg';
    return `https://img.youtube.com/vi/${videoId}/${thumbnailName}`;
  }

}
