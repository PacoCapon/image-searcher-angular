import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private accessKey = environment.unsplashAccessKey;
  private apiUrl = 'https://api.unsplash.com';

  constructor(private http: HttpClient) {}

  searchImages(query: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/photos`, {
      params: {
        query: query,
        page: page.toString()
      },
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.accessKey}`
      })
    });
  }

  getImageDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/photos/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.accessKey}`
      })
    });
  }
}
