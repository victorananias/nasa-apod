import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoFrameComponent } from './video-frame/video-frame.component';
import { HeaderComponent } from './header/header.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MosaicComponent } from './mosaic/mosaic.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoFrameComponent,
    HeaderComponent,
    PictureOfTheDayComponent,
    MosaicComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [DatePipe, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
