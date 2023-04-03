import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../../swagger/services/services/authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authservice : AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!request.url.includes('/authenticate') && !request.url.includes('/register')) {
      const token = localStorage.getItem('token');
      if (token) {
        // assigner le token;
        const authReq = request.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        });
        return next.handle(authReq);
      }
    }
    return next.handle(request);
  }

}
