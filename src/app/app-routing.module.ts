import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, children: [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'user',
      loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule)
    },
  ], canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '',   redirectTo: '/main/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
