import { initialAuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';
import { loginLogout, loginSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      session: action.session
    };
  }),
  on(loginLogout, state => {
    return {
      ...state,
      session: null
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
