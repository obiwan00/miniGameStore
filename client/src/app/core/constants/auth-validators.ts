import { Validators } from "@angular/forms";
import { StringLengthValidator } from "../validators/string-length.validator";

export const authValidators = {
  username: [StringLengthValidator(2, 20)],
  email: [Validators.email],
  password: [StringLengthValidator(6, 20)],
}
