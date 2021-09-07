import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { navLinks } from 'src/app/core/constants/routing/nav-links';
import { AuthService } from 'src/app/core/services/features/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public navLinks = navLinks
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
