import { Validators } from "@angular/forms";

export const authValidators = {
  username: [Validators.minLength(2), Validators.maxLength(20)],
  email: [Validators.email],
  password: [Validators.minLength(6), Validators.maxLength(20)],
}
