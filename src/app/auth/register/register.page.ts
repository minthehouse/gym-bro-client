import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ConfirmPasswordValidator } from 'src/app/service/auth/confirm-password.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule],
})
export class RegisterPage implements OnInit {
  form = new UntypedFormGroup(
    {
      first_name: new UntypedFormControl('', [Validators.required]),
      last_name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320),
        Validators.pattern(/^\S+@\S+\.\w+$/),
      ]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(100)]),
      password_confirmation: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(100),
      ]),

      // mobile_phone: new UntypedFormControl('', [Validators.required, emojiValidator()]),
      // agree: new UntypedFormControl(false, [Validators.requiredTrue]),
    },
    { validators: ConfirmPasswordValidator.MatchPassword },
  );

  // firstNameErrors: { validator: string; message: string; title: string }[] = [];
  // lastNameErrors: { validator: string; message: string; title: string }[] = [];
  // emailErrors: { validator: string; message: string; title: string }[] = [];
  // mobilePhoneErrors: { validator: string; message: string; title: string }[] = [];
  // passwordErrors: { validator: string; message: string; title: string }[] = [];
  // passwordConfirmationErrors: { validator: string; message: string; title: string }[] = [];

  isDateValid: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,

    private store: Store,
  ) {}

  ngOnInit() {
    // this.firstNameErrors = [
    //   ...this.authValidatorService.firstNameRequired(),
    //   ...this.authValidatorService.matchingPatternValidator(),
    // ];
    // this.lastNameErrors = [
    //   ...this.authValidatorService.lastNameRequired(),
    //   ...this.authValidatorService.matchingPatternValidator(),
    // ];
    // this.mobilePhoneErrors = [
    //   ...this.authValidatorService.mobilePhoneRequired(),
    //   ...this.authValidatorService.matchingPatternValidator(),
    // ];
    // this.emailErrors = [
    //   ...this.authValidatorService.emailRequired(),
    //   ...this.authValidatorService.emailValidators(),
    //   ...this.authValidatorService.matchingPatternValidator(),
    // ];
    // this.passwordErrors = [
    //   ...this.authValidatorService.passwordRequired(),
    //   ...this.authValidatorService.passwordValidators(),
    // ];
    // this.passwordConfirmationErrors = [
    //   ...this.authValidatorService.passwordConfirmationRequired(),
    //   ...this.authValidatorService.passwordConfirmationValidators(),
    // ];
  }

  onBlur(formControlName: string): void {
    const valueToChange = this.form.get(formControlName).value;
    this.form.get(formControlName).setValue(valueToChange);
  }

  onChange(formControlName: string, $event): void {
    this.form.get(formControlName).setValue($event.target.value);
  }

  onRegister(ngf) {
    console.log('ngf', ngf);

    if (ngf.form.valid) {
      this.authService.register(ngf.form.value).subscribe(
        response => console.log(response),
        err => {
          this.presentAlert(err);
          if (err.error.context.redirect_to) {
            this.navigateTo(err);
          }
        },
      );
    }
  }

  onSignIn() {
    this.authService.login({ email: 'hlee+new123user@docgo.com', password: 'password123' }).subscribe(res => {
      console.log('res');
    });
  }

  // setDobToForm(dateInISOString: string): void {
  //   this.form.controls.dob.setValue(dateInISOString);
  // }

  checkDateValidity(isDOBValid: boolean) {
    this.isDateValid = isDOBValid;
  }

  // onSignIn() {
  //   this.router.navigateByUrl('/login');
  // }

  async presentAlert(error: any) {
    // const alert = await this.alertController.create({
    //   cssClass: 'alert',
    //   header: 'Error',
    //   message: error.error.errors[0],
    //   buttons: [
    //     {
    //       text: `OK`,
    //       cssClass: 'alert-button-confirm',
    //     },
    //     {
    //       text: 'Chat with Us',
    //       cssClass: 'alert-button-secondary',
    //       handler: () => {
    //         this.startChat();
    //       },
    //     },
    //     {
    //       text: 'Call Us',
    //       cssClass: 'alert-button-secondary',
    //       handler: () => {
    //         const { config } = this.store.snapshot();
    //         const supportPhone = config.support_phone;
    //         window.open(`tel:${supportPhone}`, '_self');
    //       },
    //     },
    //   ],
    // });
    // await alert.present();
  }

  private navigateTo(error: any) {
    // const message = parseError(error);
    // const email = this.form.controls.email.value;
    // this.router.navigateByUrl(`/${error.error.context.redirect_to}`, { state: { message, email } });
  }

  public isRegisterDisabled() {
    return this.form.invalid || !this.isDateValid;
  }

  private startChat() {
    // this.chatService.show(defaultQuestion);
    // this.analyticsService.trackEvent('chat opened from error modal');
  }
}
