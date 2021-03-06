import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request);
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (this.authenticationService.accessToken && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authenticationService.accessToken}`
                }
            });
        }
console.log(request);
        return next.handle(request);
    }
}