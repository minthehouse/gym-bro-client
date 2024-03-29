import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Select, Store } from '@ngxs/store';
import { Observable, switchMap } from 'rxjs';
import { BackBtnComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule, BackBtnComponent],
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
})
export class GoalPage implements OnInit {
  @Select(state => state.user) user$: Observable<any>;
  public form = new UntypedFormGroup({
    goal: new UntypedFormControl(null, [Validators.required]),
    gender: new UntypedFormControl(null, [Validators.required]),
    age: new UntypedFormControl(null, [Validators.required]),
    height_in_feet: new UntypedFormControl(4, [Validators.required]),
    height_in_inches: new UntypedFormControl(0, [Validators.required]),
    weight: new UntypedFormControl(null, [Validators.required]),
  });
  private creds: any;
  public isEditMode: boolean = false;

  constructor(
    private userService: UserService,
    private store: Store,
    private router: Router,
    public authService: AuthService,
    private toastController: ToastController,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.form.patchValue(user);
      }
    });
    this.isEditMode =
      this.router.getCurrentNavigation().extras?.state?.isEditMode || this.router.url.includes('update-profile');
    this.creds = this.router.getCurrentNavigation().extras.state?.cred;
  }

  onSubmit(ngf): void {
    const { user } = this.store.snapshot();
    if (ngf.valid) {
      this.userService
        .update(user.id, ngf.form.value)
        .pipe(
          switchMap(() => {
            if (!this.isEditMode) {
              return this.authService.login(this.creds);
            } else {
              return this.presentToast();
            }
          }),
        )
        .subscribe();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your Goal is successfully updated!',
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();
  }
}
