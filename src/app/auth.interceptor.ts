import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './components/pages/user/user.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.headers.has('Content-Type')) {
      var contentType = request.headers.get('Content-Type');
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.currentUser}`,
        'Content-Type': (contentType != 'application/json' ? 'application/text' :  contentType)
      }
    });

    return next.handle(request);
  }
}
