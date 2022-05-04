import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { usersReducer } from "./state/user.reducer";
import { USER_STATE_NAME } from "./state/user.selector";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserListComponent } from "./user-list/user-list.component";

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    children:[
      {
        path: 'add',
        component: UserAddComponent
      },
      {
        path: 'edit/:id',
        component: UserEditComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(USER_STATE_NAME, usersReducer)
  ]
})
export class UserModule {}
