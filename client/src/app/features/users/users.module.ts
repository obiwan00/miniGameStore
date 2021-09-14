import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FRIENDS_SERVICE_TOKEN, UsersRoutingModule, USERS_SERVICE_TOKEN } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { UserHorizontalCardComponent } from './components/user-horizontal-card/user-horizontal-card.component';
import { UserHorizontalCardHeadingComponent } from './components/user-horizontal-card-heading/user-horizontal-card-heading.component';
import { UsersService } from '../../core/services/features/users/users.service';
import { FriendshipService } from '../../core/services/features/users/friendship.service';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { SearchBarModule } from 'src/app/shared/components/search-bar/search-bar.module';


@NgModule({
  declarations: [
    UsersComponent,
    UserHorizontalCardComponent,
    UserHorizontalCardHeadingComponent
  ],
  providers: [
    FriendshipService,
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
    UsersRoutingModule,
    LoaderModule,
    SearchBarModule,
  ]
})
export class UsersModule { }
