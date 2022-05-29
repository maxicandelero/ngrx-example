import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getUserById } from '../state/user.selector';
import { User } from 'src/app/models/user.model';
import { userEdit } from '../state/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;
  userForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.userSubscription = this.store
      .select(getUserById)
      .subscribe((u: User) => {
        if (u) {
          this.user = u;
          this.userForm.patchValue({
            username: this.user.username,
            description: this.user.description,
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      username: [null],
      description: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    const user: User = {
      id: this.user.id,
      username: this.user.username,
      description: this.userForm.value.description,
    };
    this.store.dispatch(userEdit({ user }));
    this.router.navigate(['user']);
  }
}
