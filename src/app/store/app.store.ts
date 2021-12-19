import { usersReducer } from "../user/state/user.reducer";
import { UsersState } from "../user/state/user.state";

export interface AppState {
  users: UsersState
}

export const appReducer = {
  users: usersReducer
}
