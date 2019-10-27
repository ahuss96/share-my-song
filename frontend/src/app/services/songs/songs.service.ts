import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  authToken = localStorage.getItem('auth_token');
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.authToken});

  constructor(private http: HttpClient) { }

  getAllSongRecords(): Observable<any> {
    return this.http.get<HttpResponse<JSON>>(environment.baseUrl + 'songs/all', { headers: this.headers });
  }
}
