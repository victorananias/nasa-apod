import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { PercentageLoaderService } from './percentage-loader.service';

@Component({
  selector: 'app-percentage-loader',
  templateUrl: './percentage-loader.component.html',
  styleUrls: ['./percentage-loader.component.css']
})
export class PercentageLoaderComponent implements OnInit, OnDestroy {
  public isActive = false;
  private subscription: Subscription;

  constructor(
    private decimal: DecimalPipe,
    private service: PercentageLoaderService
  ) {
    this.subscription = this.service.loaderState
      .subscribe((state: boolean) => {
        console.log('state', state);
        this.isActive = state;
      }, error => console.error(error));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get percentage() {
    return +this.decimal.transform((100 * this.service.loadedItems) / this.service.totalItems, '1.0-0');
  }

}
