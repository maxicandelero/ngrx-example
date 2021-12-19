import { User } from "src/app/models/user.model";

export interface UsersState {
  users: User[];
}

export const initialUsersState: UsersState = {
  users: [
    { id: '1', username: 'maxicandelero@gmail.com', description: 'Máximo Candelero' },
    { id: '2', username: 'jdoe@mail.com', description: 'John Doe' }
  ]
}
