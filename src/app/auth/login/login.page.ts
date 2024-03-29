import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthValidatorService } from 'src/app/service/auth/auth-validators.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // @Select(state => state?.user?.isAccountLocked) public isAccountLocked$: Observable<boolean>;

  submitted = false;
  form = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(320),
      Validators.pattern(/^\S+@\S+\.\w+$/),
    ]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
  });
  emailErrors: { validator: string; message: string; title: string }[] = [];
  passwordErrors: { validator: string; message: string; title: string }[] = [];
  message: string;
  messageType: string;
  confirmEmail: boolean = false;
  isBiometricAvailable: boolean;
  constructor(
    public authService: AuthService,
    private router: Router,
    private authValidatorService: AuthValidatorService,
    private store: Store,
    private alertController: AlertController, // private analyticsService: AnalyticsService,
  ) {
    this.emailErrors = [
      ...this.authValidatorService.emailRequired(),
      ...this.authValidatorService.emailValidators(),
      ...this.authValidatorService.matchingPatternValidator(),
    ];
    this.passwordErrors = [
      ...this.authValidatorService.passwordRequired(),
      ...this.authValidatorService.matchingPatternValidator(),
    ];
  }

  ngOnInit(): void {}

  onLogin(ngf): void {
    if (ngf.valid) {
      this.authService.login(ngf.form.value).subscribe();
    }
  }

  onForgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }

  private confirm(confirmation_token: string): void {
    this.authService.confirm(confirmation_token).subscribe(() => {
      this.presentAlert('Sign into your account to get started');
    });
  }

  private async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Welcome!',
      message,
      buttons: [
        {
          text: 'Continue',
          cssClass: 'alert-button-ok-only',
          role: 'cancel',
          handler: () => this.router.navigate(['/login']),
        },
      ],
    });
    await alert.present();
  }
}
