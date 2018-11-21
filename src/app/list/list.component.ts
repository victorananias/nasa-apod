import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  mediaList: Media[] = [];
  constructor(
    private service: AppService
  ) { }

  ngOnInit() {
    const date = new Date;
    console.log(date.getDay());


    this.service.getMedia({start_date: '2018-11-18'})
      .subscribe((mediaList: Media[]) => {
        this.mediaList = mediaList;
      });
  }

}
