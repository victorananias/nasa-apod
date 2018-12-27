import { Injectable, Output, EventEmitter } from '@angular/core';
import { Media } from './media.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  @Output() imagesLoaded: EventEmitter<Media[]> = new EventEmitter<Media[]>();
  private mediaList;
  _downloadedImgs = 0;

  constructor() { }

  loadImages(mediaList: Media[]) {
    this.mediaList = mediaList.sort((a, b) => b.date.localeCompare(a.date))
      .map((media) => {

      media = new Media(media);

      const image = new Image();

      image.src = media.src;

      image.onload = () => {
        this.downloadedImgs++;
      };

      return media;
    });
  }

  set downloadedImgs(number) {
    this._downloadedImgs = number;

    if (this._downloadedImgs === this.mediaList.length) {
      this.imagesLoaded.emit(this.mediaList);
    }
  }

  get downloadedImgs() {
    return this._downloadedImgs;
  }

}
