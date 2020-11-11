import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
  ],
})
export class UsersModule {}
