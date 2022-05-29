import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router-selector';
import { UsersState } from './user.state';

export const USER_STATE_NAME = 'users';
const getUsersState = createFeatureSelector<UsersState>(USER_STATE_NAME);

export const getUsers = createSelector(getUsersState, (state) => {
  return state.users;
});

export const getUserById = createSelector(
  getUsers,
  getCurrentRoute,
  (users: any, route: RouterStateUrl) => {
    return users ? users.find((u: User) => u.id === route.params['id']) : null;
  }
);
