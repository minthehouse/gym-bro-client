import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Store } from '@ngxs/store';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule],
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
})
export class GoalPage implements OnInit {
  public form = new UntypedFormGroup({
    goal: new UntypedFormControl(null, [Validators.required]),
    gender: new UntypedFormControl(null, [Validators.required]),
    age: new UntypedFormControl(null, [Validators.required]),
    height_in_feet: new UntypedFormControl(4, [Validators.required]),
    height_in_inches: new UntypedFormControl(0, [Validators.required]),
    weight: new UntypedFormControl(null, [Validators.required]),
  });
  private creds: any;

  constructor(
    private userService: UserService,
    private store: Store,
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.creds = this.router.getCurrentNavigation().extras.state;
  }

  onSubmit(ngf): void {
    const { user } = this.store.snapshot();
    if (ngf.valid) {
      this.userService
        .update(user.id, ngf.form.value)
        .pipe(switchMap(() => this.authService.login(this.creds)))
        .subscribe();
    }
  }
}
