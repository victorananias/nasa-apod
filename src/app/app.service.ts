import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getMedia(params = {}) {
    params['api_key'] = this.apiKey;
    return this.http.get(`${this.apiUrl}`, {
      params: params
    });
  }
}
