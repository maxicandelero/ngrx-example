import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getErrorMessage, getLoading } from 'src/app/store/shared/shared.selector';
import { loginStart } from '../state/auth.actions';

interface LoginData {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;
  loginForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group<LoginData>({
      username: this.formBuilder.control(null, [
        Validators.required,
        Validators.email
      ]),
      password: this.formBuilder.control(null, [
        Validators.required
      ])
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({ username, password }));
  }
}
