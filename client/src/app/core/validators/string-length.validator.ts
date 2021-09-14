import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function StringLengthValidator(min: number, max: number = min): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValueLength = control.value.length
    const error = { stringLength: { min, max } }
    if (min === max && controlValueLength !== min) {
      Object.assign(
        error.stringLength, {
        getErrorMessage: (fieldName: string) => {
          return `Field ${fieldName} have to include ${min} symbols!`
        }
      })
      return error
    }
    if (controlValueLength < min || controlValueLength > max) {
      Object.assign(
        error.stringLength, {
        getErrorMessage: (fieldName: string) => {
          return `Field ${fieldName} have to include at least ${min} symbols, but  less than ${max} characters!`
        }
      })
      return error
    }
    return null
  }
}
