import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-frame',
  templateUrl: './video-frame.component.html',
  styleUrls: ['./video-frame.component.css']
})
export class VideoFrameComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('src') _src;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  get src() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this._src);
  }

}
