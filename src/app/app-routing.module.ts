import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';

/**
 * Rutas securizadas
 */
const secureRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  /**
   * Consulta de usuarios
   */
  {
    path: 'users',
    component: UserComponent
  },
  /**
   * Creación de usuarios.
   */
  {
    path: 'users/create',
    component: UserDetailComponent
  },
  /**
   * Detalle de usuarios.
   */
  {
    path: 'users/:id',
    component: UserDetailComponent
  }
];

const routes: Routes = [
/**
 * Login
 */
 {
    path: 'login',
    component: LoginComponent
  },

  /**
   * Ruta main securizada.
   */
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: secureRoutes
  },

  // otherwhise redirect to main
  {
      path: '**',
      redirectTo: 'main/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
