import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Media } from './media.model';

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

      this.http.get<Object[]>(`${this.apiUrl}`, {
        params: Object.assign({ api_key: this.apiKey }, params)
      })
      .subscribe((response: any) => {
          this._mediaList = response.sort((a, b) => b.date.localeCompare(a.date)).map(media => new Media(media));
          observer.next(this._mediaList);
        }, error => observer.error(error));
    });
  }

  setMedia(media) {
    this._media = media;
  }

  getMedia(date): Observable<Media> {
    return new Observable<Media>(observer => {
      if (this._media && this._media.date === date) {
        observer.next(this._media);
      }

      this.http.get<Media>(`${this.apiUrl}`, {
        params: { date, api_key: this.apiKey }
      })
      .subscribe(
        (media: Object) => observer.next(new Media(media)),
        error => observer.error(error)
      );
    });
  }

  sameParams(newParams) {
    return JSON.stringify(this.params) === JSON.stringify(newParams);
  }
}
