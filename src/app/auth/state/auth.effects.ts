import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { loginAuto, loginStart, loginSuccess } from "./auth.actions";
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
            return loginSuccess({ session });
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
      tap((action) => this.router.navigate(['/']))
    );
  }, { dispatch: false });

  loginAuto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAuto),
      map((action) => {
        const session = this.authService.getSessionFromLocalStorage();
        console.log(session);
      })
    );
  }, { dispatch: false });
}
