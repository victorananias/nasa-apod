import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  mediaList: any = [];
  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.getMedia({start_date: '2018-11-01'})
      .subscribe(response => {
        this.mediaList = response;
      });
  }

}
