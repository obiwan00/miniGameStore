import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
