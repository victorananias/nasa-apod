import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  media: Media;
  @ViewChild('imagem') imagem: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: AppService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getMedia(params.date);
    });
  }

  private getMedia(date) {
    this.service.getMedia({date})
      .subscribe((media: Media) => {
        const image = new Image;
        if (media.media_type === 'video') {
          image.src = this.youtubeImage( media.url);
        } else {
          image.src = media.url;
        }

        image.onload = () => {
          console.log(this.imagem);
          this.imagem.nativeElement.src = image.src;
          console.log('carregou');
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
