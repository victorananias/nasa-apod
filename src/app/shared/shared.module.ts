import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PercentageLoaderComponent } from './percentage-loader/percentage-loader.component';
import { DotsComponent } from './dots/dots.component';
import { CircleComponent } from './percentage-loader/circle/circle.component';
import { Subject } from 'rxjs';
import { DarkButtonComponent } from './dark-button/dark-button.component';

@NgModule({
  declarations: [
    PercentageLoaderComponent,
    CircleComponent,
    DotsComponent,
    DarkButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PercentageLoaderComponent,
    CircleComponent,
    DotsComponent,
    DarkButtonComponent
  ],
  providers: [Subject]
})
export class SharedModule { }
