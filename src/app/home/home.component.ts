import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  media: Media;
  @ViewChild('imagem') imagem: ElementRef;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.getMedia(/* { date: '2018-11-01' } */)
      .subscribe((media: Media) => {
        this.media = media;
        const image = new Image;
        image.src = media.url;
        image.onload = () => {
          console.log(this.imagem);
          this.imagem.nativeElement.src = media.url;
          console.log('carregou');
          console.log(this.imagem);

        };
      });
  }

}
