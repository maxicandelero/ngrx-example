import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { getToken } from '../pages/auth/state/auth.selector';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      exhaustMap((token) => {
        if (!token) {
          return next.handle(request);
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        // if (request.responseType === 'json') {
        //   headers['Content-Type'] = 'application/json';
        // }
        request = request.clone({
          setHeaders: headers,
        });
        return next.handle(request);
      })
    );
  }
}
