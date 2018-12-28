import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PercentageLoaderService {
  loaderState = this.loaderSubject.asObservable();
  totalItems = 0;
  private _loadedItems = 0;

  constructor(
    private loaderSubject: Subject<boolean>
  ) {}

  show() {
    console.log('show');
    this.resetPercentage();
    this.loaderSubject.next(true);
  }

  hide() {
    console.log('hide');
    this.loaderSubject.next(false);
  }

  resetPercentage() {
    this.loadedItems = 0;
  }

  set loadedItems(number) {
    console.log(number);
    this._loadedItems = number;

    if (+this.loadedItems === +this.totalItems) {
      this.hide();
    }
  }

  get loadedItems() {
    return this._loadedItems;
  }
}
