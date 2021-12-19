import { createReducer, on } from '@ngrx/store';
import { userAdd, userDelete, userEdit } from './user.actions';
import { initialUsersState } from './user.state';

const _usersReducer = createReducer(initialUsersState,
  on(userAdd, (state, action) => {
    let user = { ...action.user };
    user.id = (state.users.length + 1).toString();
    return {
      ...state,
      users: [...state.users, user]
    }
  }),
  on(userEdit, (state, action) => {
    const editUsers = state.users.map((user) => {
      return action.user.id === user.id ? action.user : user;
    });
    return {
      ...state,
      users: editUsers
    }
  }),
  on(userDelete, (state, { id }) => {
    const editUsers = state.users.filter((user) => user.id !== id);
    return {
      ...state,
      users: editUsers
    }
  })
);

export function usersReducer(state: any, action: any) {
  return _usersReducer(state, action);
}
