import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
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
