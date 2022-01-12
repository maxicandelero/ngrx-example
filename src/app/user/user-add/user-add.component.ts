import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { userAdd } from '../state/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      username: [null, [
        Validators.required,
        Validators.email
      ]],
      description: [null, [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid){
      return;
    }
    const user: User = {
      id: '',
      username: this.userForm.value.username,
      description: this.userForm.value.description,
    };
    this.store.dispatch(userAdd({ user }));
    this.router.navigate(['user']);
  }
}
