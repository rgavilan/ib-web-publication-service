import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  /**
   * Consulta de usuarios.
   */
  {
    path: '',
    component: UserComponent,
  },
  /**
   * Crear de usuarios.
   */
  {
    path: 'create',
    component: UserDetailComponent,
  },
  /**
   * Detalle de usuarios.
   */
  {
    path: ':id',
    component: UserDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
