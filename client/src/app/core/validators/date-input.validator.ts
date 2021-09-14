import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function DateInputValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // test yyyy-mm-dd format. Example: '2000-08-06' => true / '3001-62-06' => false
    if (!control.value.match(/^\d{4}-(1[0-2]|0[1-9])-(3[01]|[1-2][0-9]|0[1-9])$/)) {
      return {dateFormat: 'Date format have to match \'yyyy-mm-dd\' format'}
    }
    return null
  }
}
