import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authValidators } from 'src/app/core/constants/auth-validators';
import { routingUrl } from 'src/app/core/constants/routing/routing-url';
import { DefaultRes } from 'src/app/core/models/default-res.model';
import { AuthService } from 'src/app/core/services/features/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // TODO: ADD: Add validation error messages for registerForm
  public routingUrl = routingUrl

  public serverErrorMessage: string;
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, ...authValidators.username]),
      email: new FormControl('', [Validators.required, ...authValidators.email]),
      password: new FormControl('', [Validators.required, ...authValidators.password])
    })
  }

  submitFrom() {
    this.registerForm.disable();
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.router.navigate([this.routingUrl.auth.baseUrl, this.routingUrl.auth.pages.login]);
        },
        error: (error: DefaultRes) => {
          this.serverErrorMessage = error?.message
          this.registerForm.enable();
        }
      });
  }
}
