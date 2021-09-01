import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Credentials } from 'src/app/core/modules/credentials';
import { authValidators } from 'src/app/core/validators/auth.validators';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // TODO: Add validation error messages for loginForm

  public serverErrorMessage: null;
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
        error: (error) => {
          console.error(error);
          this.serverErrorMessage = error?.message
          this.loginForm.enable();
        }
      });
  }
}
