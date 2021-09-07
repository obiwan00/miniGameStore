import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UsersQueryParams } from 'src/app/core/models/users/users-query-params.model';
import { UsersRes } from 'src/app/core/models/users/users-res.model';
import { AbstractUsersService } from './users.abstract-service';

@Injectable()
export class UsersService extends AbstractUsersService {

  constructor(
    private apiService: ApiService,
  ) {
    super()
  }

  getUsers(params: Partial<UsersQueryParams> = {}): Observable<UsersRes> {
    return this.apiService.get('/users', new HttpParams({ fromObject: params }));
  }
}
