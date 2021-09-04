import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isAuthenticated?: Observable<boolean>

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated$
  }

  logout() {
    this.authService.logout();
  }
}
