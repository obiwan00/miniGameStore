import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UsersQueryParams } from 'src/app/core/models/users/users-query-params.model';
import { FriendsRes } from 'src/app/core/models/users/users-res.model';
import { AbstractUsersService } from './users.abstract-service';

@Injectable()
export class FriendshipService extends AbstractUsersService {

  constructor(
    private apiService: ApiService,
  ) {
    super()
  }

  getUsers(params: Partial<UsersQueryParams> = {}): Observable<FriendsRes> {
    return this.apiService.get('/friends', new HttpParams({ fromObject: params }));
  }

  requestFriendship(friendId: string) {
    return this.apiService.post(`/friends/${friendId}`)
  }
  deleteFriendship(friendId: string) {
    return this.apiService.delete(`/friends/${friendId}`)
  }
  acceptFriendship(friendId: string) {
    return this.apiService.patch(`/friends/${friendId}/accept`)
  }
  rejectFriendship(friendId: string) {
    return this.apiService.patch(`/friends/${friendId}/reject`)
  }
}
