import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/users/user.model';
import { ApiService } from '../../api.service';

@Injectable()
export class ProfileService {

  constructor(
    private apiService: ApiService
  ) { }

  patchProfile(data: Partial<Pick<User, 'username' | 'birthday'>>) {
    return this.apiService.patch('/users/me', data)
  }
}
