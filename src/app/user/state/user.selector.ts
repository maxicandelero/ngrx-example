import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UsersState } from './user.state';

const getUsersState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(getUsersState, (state) => {
  return state.users;
});

export const getUserById = createSelector(getUsersState, (state: any, props: any) => {
  return state.users.find((u: User) => u.id === props.id);
});
