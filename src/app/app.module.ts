import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoFrameComponent } from './video-frame/video-frame.component';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { DotsComponent } from './loader/dots/dots.component';
import { CircleComponent } from './loader/circle/circle.component';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoFrameComponent,
    ListComponent,
    HeaderComponent,
    LoaderComponent,
    DotsComponent,
    CircleComponent,
    PictureOfTheDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DatePipe, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
