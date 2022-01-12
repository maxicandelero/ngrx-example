import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.state';
import { userDelete } from '../state/user.actions';
import { getUsers } from '../state/user.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = new Observable<User[]>();

  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit(): void {
    this.users$ = this.store.select(getUsers);
  }

  onDeleteUser(id: string): void {
    if (confirm('Are you sure you want to delete?')) {
      this.store.dispatch(userDelete({ id }));
    }
  }
}
