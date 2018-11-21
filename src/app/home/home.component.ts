import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  media: Media;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.getMedia(/* { date: '2018-11-01' } */)
      .subscribe((media: Media) => {
        this.media = media;
        console.log(media);
      });
  }

}
