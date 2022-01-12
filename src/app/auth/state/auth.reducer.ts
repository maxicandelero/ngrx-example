import { initialAuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';
import { loginSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      session: action.session
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
