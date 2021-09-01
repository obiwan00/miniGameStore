import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../modules/user.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(({} as User));

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private authService: AuthService
  ) { }

  startSession() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/users/me')
        .subscribe(
          data => {
            this.initUser(data.user);
            this.authService.setAuthStatus(true);
          },
          err => {
            console.error(err?.message);
            this.authService.logout();
          },
        );
    } else {
      this.authService.logout();
    }
  }

  initUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getUser() {
    return this.currentUserSubject.value;
  }
}
