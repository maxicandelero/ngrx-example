import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { userAdd } from '../state/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  submitted: boolean = false;
  userForm: FormGroup = this.formBuilder.group({
    username: [null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]],
    description: [null, [
      Validators.required,
      Validators.minLength(5)
    ]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.submitted = true;
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
