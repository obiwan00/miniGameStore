import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Credentials } from '../core/modules/credentials';
import { User } from '../core/modules/user.model';
import { ApiService } from '../core/services/api.service';
import { JwtService } from '../core/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  isAuthenticated() {
    return this.isAuthenticatedSubject.value
  }

  login({ email, password }: Credentials): Observable<{ jwtToken: string }> {
    return this.apiService.post('/auth/login', { email, password })
      .pipe(
        tap(({ jwtToken }) => this.jwtService.saveToken(jwtToken)),
        tap(() => { this.isAuthenticatedSubject.next(true) }),
      );
  }

  logout() {
    this.jwtService.destroyToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login'])
  }

  register({ username, email, password }: Credentials & Pick<User, 'username'>): Observable<any> {
    return this.apiService.post('/auth/register', { username, email, password });
  }

  setAuthStatus(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }
}
