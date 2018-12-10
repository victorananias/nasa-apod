import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaComponent } from './media/media.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoFrameComponent } from './video-frame/video-frame.component';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaComponent,
    VideoFrameComponent,
    ListComponent,
    HeaderComponent,
    LoaderComponent,
    ItemComponent
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
