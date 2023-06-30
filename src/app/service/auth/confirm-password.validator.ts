import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl) {
    const passwordValue = control.get('password')?.value;
    const confirmPasswordValue = control.get('password_confirmation')?.value;

    return passwordValue === confirmPasswordValue ? null : { ConfirmPassword: true };
  }
}
