import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from "rxjs";
import { IUser } from "../../components/user/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/users';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) { }

  registerUser(user: IUser): Observable<Object> {
    // let headers = new HttpParams().set('Authorization', this.authToken);
    return this.http.post<HttpResponse<JSON>>(this.baseUrl + '/register', user, { headers: this.headers });
  }

  authenticateUser(credentials: {}): Observable<any> {
    return this.http.post<HttpResponse<JSON>>(this.baseUrl + '/authenticate', credentials);
  }
  //
  // getProfile () {
  //   let headers = new Headers();
  //   this.loadToken();
  //   headers.append('Authorization', this.authToken);
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.get(`${this.baseUrl}/users/profile`, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  storeUserData(token, user): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
