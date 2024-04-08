import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../pages/auth/state/auth.selector';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ){}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      map(authenticated => {
        if (!authenticated) {
          return this.router.createUrlTree(['auth'])
        }
        return true;
      })
    );
  }
}

export const IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> => {
  return inject(AuthGuard).canActivate(route);
}
