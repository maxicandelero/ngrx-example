import { User } from "src/app/models/user.model";
import { createAction, props } from '@ngrx/store';

export const USER_ADD_ACTION = '[users page] add user';
export const USER_EDIT_ACTION = '[users page] edit user';
export const USER_DELETE_ACTION = '[users page] delete user';

export const userAdd = createAction(USER_ADD_ACTION, props<{ user: User}>());
export const userEdit = createAction(USER_EDIT_ACTION, props<{ user: User}>());
export const userDelete = createAction(USER_DELETE_ACTION, props<{ id: string}>());
