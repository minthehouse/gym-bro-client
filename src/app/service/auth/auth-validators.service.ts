import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthValidatorService {
  constructor() {}

  public firstNameRequired() {
    return [{ validator: 'required', message: `First Name is required`, title: 'first_name' }];
  }

  public lastNameRequired() {
    return [{ validator: 'required', message: `Last Name is required`, title: 'last_name' }];
  }

  public dobRequired() {
    return [{ validator: 'required', message: `Date of Birth is required`, title: 'dob' }];
  }

  public mobilePhoneRequired() {
    return [{ validator: 'required', message: `Phone is required`, title: 'mobile_phone' }];
  }

  public emailRequired() {
    return [{ validator: 'required', message: `Email is required`, title: 'email' }];
  }

  public emailValidators() {
    return [
      { validator: 'email', message: `Email is invalid`, title: 'email' },
      { validator: 'pattern', message: `Email is invalid`, title: 'pattern' },
      {
        validator: 'minlength',
        message: `Email should have at least 9 characters`,
        title: 'email',
      },
      {
        validator: 'maxlength',
        message: `Email should have maximum 360 characters`,
        title: 'email',
      },
    ];
  }

  public dobValidators() {
    return [{ validator: 'pattern', message: `Date of Birth is invalid`, title: 'dob' }];
  }

  public passwordRequired() {
    return [
      {
        validator: 'required',
        message: `Password is required`,
        title: 'password',
      },
    ];
  }

  public passwordValidators() {
    return [
      {
        validator: 'maxlength',
        message: `Password should have maximum 100 characters`,
        title: 'password',
      },
    ];
  }

  public matchingPatternValidator() {
    return [
      {
        validator: 'noEmoji',
        message: 'Please enter valid values',
        title: 'noEmoji',
      },
    ];
  }

  public passwordConfirmationRequired() {
    return [
      {
        validator: 'required',
        message: `Confirm Password is required`,
        title: 'password_confirmation',
      },
    ];
  }

  public passwordConfirmationValidators() {
    return [
      {
        validator: 'maxlength',
        message: `Confirm Password should have maximum 100 characters`,
        title: 'password_confirmation',
      },
      {
        validator: 'ConfirmPassword',
        message: 'Confirm Password should match Password',
        title: 'password_matching',
      },
    ];
  }

  public pinRequired() {
    return [{ validator: 'required', message: `PIN Code is required`, title: 'pin' }];
  }

  public pinValidators() {
    return [
      {
        validator: 'pattern',
        message: `PIN Code should have digits only`,
        title: 'pin',
      },
      {
        validator: 'minlength',
        message: `PIN Code should have 5 digits`,
        title: 'pin',
      },
      {
        validator: 'maxlength',
        message: `PIN Code should have 5 digits`,
        title: 'pin',
      },
    ];
  }
}
