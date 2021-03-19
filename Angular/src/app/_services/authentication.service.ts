import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  accessToken: any;
  constructor(private http: HttpClient){}

  login(Email,Password) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { Email, Password }).pipe(
      map(user => {
        console.log(user);
        if (user && user.accessToken) {
          this.accessToken = user.accessToken
          console.log(this.accessToken)
        }
        return user;
    }),
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}