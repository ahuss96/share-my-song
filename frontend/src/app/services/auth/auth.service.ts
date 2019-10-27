import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from "rxjs";
import { IUser } from "../../components/user/user.model";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  user: IUser;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) { }

  registerUser(user: IUser): Observable<any> {
    // let headers = new HttpParams().set('Authorization', this.authToken);
    return this.http.post<HttpResponse<JSON>>(environment.baseUrl + 'users/register', user, { headers: this.headers });
  }

  authenticateUser(credentials: {}): Observable<any> {
    return this.http.post<HttpResponse<JSON>>(environment.baseUrl + 'users/authenticate', credentials);
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
    this.user = user;
  }

  getToken(): string {
    return localStorage.getItem('auth_token');
  }

  getUser(): IUser {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user;
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
