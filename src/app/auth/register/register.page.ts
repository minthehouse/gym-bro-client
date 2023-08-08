import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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
    },
    { validators: ConfirmPasswordValidator.MatchPassword },
  );

  isDateValid: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onBlur(formControlName: string): void {
    const valueToChange = this.form.get(formControlName).value;
    this.form.get(formControlName).setValue(valueToChange);
  }

  onChange(formControlName: string, $event): void {
    this.form.get(formControlName).setValue($event.target.value);
  }

  onRegister(ngf) {
    if (ngf.form.valid) {
      this.authService.register(ngf.form.value).subscribe(
        response => console.log(response),
        err => {
          this.presentAlert(err);
        },
      );
    }
  }

  onSignIn() {
    this.router.navigateByUrl('/login');
  }

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
}
