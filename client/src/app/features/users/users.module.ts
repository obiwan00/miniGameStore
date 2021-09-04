import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FRIENDS_SERVICE_TOKEN, UsersRoutingModule, USERS_SERVICE_TOKEN } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserHorizontalCardComponent } from './components/user-horizontal-card/user-horizontal-card.component';
import { UserHorizontalCardHeadingComponent } from './components/user-horizontal-card-heading/user-horizontal-card-heading.component';
import { UsersService } from './services/users.service';
import { FriendshipService } from './services/friendship.service';


@NgModule({
  declarations: [
    UsersComponent,
    UserHorizontalCardComponent,
    UserHorizontalCardHeadingComponent
  ],
  providers: [
    {
      provide: USERS_SERVICE_TOKEN,
      useClass: UsersService,
    },
    {
      provide: FRIENDS_SERVICE_TOKEN,
      useClass: FriendshipService,
    },
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
