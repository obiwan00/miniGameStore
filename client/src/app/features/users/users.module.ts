import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { FRIENDS_SERVICE_TOKEN, UsersRoutingModule, USERS_SERVICE_TOKEN } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { UserTableRecord } from './components/user-table-record/user-table-record.component';
import { UserTableHeading } from './components/user-horizontal-card-heading/user-table-heading.component';
import { UsersService } from '../../core/services/features/users/users.service';
import { FriendshipService } from '../../core/services/features/users/friendship.service';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { SearchBarModule } from 'src/app/shared/components/search-bar/search-bar.module';


@NgModule({
  declarations: [
    UsersComponent,
    UserTableRecord,
    UserTableHeading,
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
    NgxPaginationModule,
  ]
})
export class UsersModule { }
