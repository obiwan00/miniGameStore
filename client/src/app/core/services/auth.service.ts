import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { routingUrl } from '../constants/routing/routing-url';
import { Credentials } from '../models/credentials.model';
import { User } from '../models/users/user.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable()

  public isAuthenticated$ = this.currentUser$.pipe(map(user => user !== null))
  public routingUrl = routingUrl;

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  login({ email, password }: Credentials): Observable<{ jwtToken: string }> {
    return this.apiService.post('/auth/login', { email, password })
      .pipe(
        tap(({ jwtToken }) => { this.jwtService.saveToken(jwtToken) }),
        tap(() => { this.startSession() }),
      );
  }

  logout() {
    this.endSession();

    this.router.navigate([this.routingUrl.auth.baseUrl, this.routingUrl.auth.pages.login]);
  }

  endSession() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  register({ username, email, password }: Credentials & Pick<User, 'username'>): Observable<any> {
    return this.apiService.post('/auth/register', { username, email, password });
  }

  startSession() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/users/me')
        .subscribe(
          data => {
            this.initUser(data.user);
          },
          err => {
            console.error(err?.message);
            this.logout();
          },
        );
    } else {
      this.logout();
    }
  }

  initUser(user: User) {
    this.currentUserSubject.next(user);
  }

}
