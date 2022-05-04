import { AuthState } from "./auth.state";
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME)

export const isAuthenticated = createSelector(getAuthState, state => {
  return state.session ? true : false;
});
export const getToken = createSelector(getAuthState, state => {
  return state.session ? state.session.sessionToken : null;
});