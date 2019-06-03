import { Injectable, Output, EventEmitter } from '@angular/core';
import { Media } from './media.model';
import { PercentageLoaderService } from './shared/percentage-loader/percentage-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  @Output() imagesLoaded: EventEmitter<Media[]> = new EventEmitter<Media[]>();
  private mediaList = [];

  constructor(
    private percentageLoaderService: PercentageLoaderService
  ) { }

  loadImages(mediaList: Media[]) {

    this.mediaList = mediaList.sort((a, b) => b.date.localeCompare(a.date))
      .map((media: Media) => {

        const image = new Image();

        image.src = media.src;

        image.onload = () => {
          this.percentageLoaderService.loadedItems++;
          if (this.percentageLoaderService.totalItems === this.percentageLoaderService.loadedItems) {
            this.imagesLoaded.emit(this.mediaList);
          }
        };

        return media;
      });
  }

}
