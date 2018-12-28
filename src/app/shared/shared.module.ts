import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PercentageLoaderComponent } from './percentage-loader/percentage-loader.component';
import { DotsComponent } from './dots/dots.component';
import { CircleComponent } from './percentage-loader/circle/circle.component';
import { Subject } from 'rxjs';

@NgModule({
  declarations: [
    PercentageLoaderComponent,
    CircleComponent,
    DotsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PercentageLoaderComponent,
    CircleComponent,
    DotsComponent
  ],
  providers: [Subject]
})
export class SharedModule { }
