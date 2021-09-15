import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authValidators } from 'src/app/core/constants/auth-validators';
import { routingUrl } from 'src/app/core/constants/routing/routing-url';
import { DefaultRes } from 'src/app/core/models/default-res.model';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public routerUrl = routingUrl

  public serverErrorMessage: string;
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, ...authValidators.email]),
      password: new FormControl('', [Validators.required, ...authValidators.password])
    })
  }

  submitFrom() {
    this.loginForm.disable();
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: DefaultRes) => {
          this.serverErrorMessage = error?.message
          this.loginForm.enable();
        }
      });
  }
}
