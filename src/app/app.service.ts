import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private _media: Media;
  private _mediaList: Media[] = [];
  private _params = {};

  constructor(private http: HttpClient) {}

  getMediaList(params = {}): Observable<Media[]> {
    return new Observable<Media[]>(observer => {
      if (!this._mediaList.length && this.sameParams(params)) {
        observer.next(this._mediaList);
      }

      this.params = params;

      this.http.get<Media[]>(`${this.apiUrl}`, {
        params: this.params
      }).subscribe(
        (response: Media[]) => observer.next(response),
        (error => observer.error())
      );
    });
  }

  getMedia(params = {}): Observable<Media> {
    return new Observable<Media>(observer => {
      this.http.get<Media>(`${this.apiUrl}`, {
        params: params
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
    return JSON.stringify(currentParams) === JSON.stringify(newParams);
  }
}
