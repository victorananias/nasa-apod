import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Media } from './media.model';
import { format } from 'date-fns';



@Injectable({
  providedIn: 'root'
})

export class AppService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private _media: Media;
  private _mediaList: Media[] = [];
  private params = {};

  constructor(
    private http: HttpClient
  ) {}

  getMediaList(params = {}): Observable<Media[]> {
    return new Observable<Media[]>(observer => {
      if (this._mediaList.length && this.sameParams(params)) {
        return observer.next(this._mediaList);
      }

      this.params = params;

      this.http.get<Media[]>(`${this.apiUrl}`, {
        params: Object.assign({ api_key: this.apiKey }, params)
      })
      .subscribe((response: Media[]) => {
          this._mediaList = response;
          observer.next(response);
        }, error => observer.error(error));
    });
  }

  setMedia(media) {
    this._media = media;
  }

  getMedia(date = format(new Date, 'YYYY-MM-DD')): Observable<Media> {
    return new Observable<Media>(observer => {
      if (this._media) {
        observer.next(this._media);
      }

      this.http.get<Media>(`${this.apiUrl}`, {
        params: { date, api_key: this.apiKey }
      })
      .subscribe(
        (response: Media) => observer.next(response),
        error => observer.error(error)
      );
    });
  }

  sameParams(newParams) {
    return JSON.stringify(this.params) === JSON.stringify(newParams);
  }
}
