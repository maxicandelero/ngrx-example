import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { authReducer } from "../pages/auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../pages/auth/state/auth.selector";
import { AuthState } from "../pages/auth/state/auth.state";
import { sharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  [AUTH_STATE_NAME]: authReducer,
  router: routerReducer,
}
