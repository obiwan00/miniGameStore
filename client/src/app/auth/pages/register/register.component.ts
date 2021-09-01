import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authValidators } from 'src/app/core/validators/auth.validators';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // TODO: Add validation error messages for registerForm

  public serverErrorMessage: null;
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
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.serverErrorMessage = error?.message
          this.registerForm.enable();
        }
      });
  }
}
