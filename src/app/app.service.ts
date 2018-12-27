import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private _media: Media;
  private _mediaList: Media[] = [];
  private _params = {};

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  getMediaList(params = {}): Observable<Media[]> {
    return new Observable<Media[]>(observer => {
      if (this._mediaList.length && this.sameParams(params)) {
        return observer.next(this._mediaList);
      }

      this.params = params;

      this.http.get<Media[]>(`${this.apiUrl}`, {
        params: this.params
      }).subscribe(
        (response: Media[]) => {
          this._mediaList = response;
          observer.next(response);
        },
        (error => observer.error())
      );
    });
  }

  setMedia(media) {
    this._media = media;
  }

  getMedia(date = this.datePipe.transform(new Date, 'yyyy-MM-dd')): Observable<Media> {
    return new Observable<Media>(observer => {
      if (this._media) {
        observer.next(this._media);
      }

      this.http.get<Media>(`${this.apiUrl}`, {
        params: { date, api_key: this.apiKey }
      }).subscribe(
        (response: Media) => observer.next(response),
        (error => observer.error())
      );
    });
  }

  set params(params) {
    this._params = params;
    this._params['api_key'] = this.apiKey;
  }

  get params() {
    return this._params;
  }

  sameParams(newParams) {
    const currentParams = Object.assign({}, this.params);
    delete currentParams['api_key'];
    console.log(JSON.stringify(currentParams) === JSON.stringify(newParams));
    return JSON.stringify(currentParams) === JSON.stringify(newParams);
  }
}
