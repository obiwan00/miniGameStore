import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { routingUrl } from '../../constants/routing/routing-url';
import { Credentials } from '../../models/credentials.model';
import { User } from '../../models/users/user.model';
import { ApiService } from '../api.service';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()
  public routingUrl = routingUrl;

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
    this.router.navigate([this.routingUrl.auth.baseUrl, this.routingUrl.auth.pages.login]);
  }

  register({ username, email, password }: Credentials & Pick<User, 'username'>): Observable<any> {
    return this.apiService.post('/auth/register', { username, email, password });
  }

  setAuthStatus(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }
}
