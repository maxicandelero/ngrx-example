import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { loginAuto, loginLogout, loginStart, loginSuccess } from "./auth.actions";
import { Store } from '@ngrx/store';
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.authService.login(action.username, action.password).pipe(
          map((data) => {
            const session = this.authService.formatSession(data);
            this.authService.setSessionInLocalStorage(session);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            return loginSuccess({ session, redirect: true });
          }),
          catchError(error => {
            const message = this.authService.getErrorMessage(error.error);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap((action) => {
        if (action.redirect) {
          this.router.navigate(['']);
        }
      })
    );
  }, { dispatch: false });

  loginAuto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAuto),
      mergeMap((action) => {
        const session = this.authService.getSessionFromLocalStorage();
        return of(loginSuccess({ session, redirect: false }));
      })
    );
  });

  loginLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginLogout),
      map((action) => {
        this.authService.logout();
        this.router.navigate(['auth']);
      })
    );
  }, { dispatch: false });
}
