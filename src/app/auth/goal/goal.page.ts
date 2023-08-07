import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule],
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
})
export class GoalPage implements OnInit {
  submitted = false;
  form = new UntypedFormGroup({
    goal: new UntypedFormControl('', [Validators.required]),
    gender: new UntypedFormControl('', [Validators.required]),
    age: new UntypedFormControl('', [Validators.required]),
    height: new UntypedFormControl('', [Validators.required]),
    weight: new UntypedFormControl('', [Validators.required]),
  });
  selectedInches: number; // Define the selectedInches property here
  selectedFeet: number; // Define the selectedInches property here

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(form => {
      console.log('form', form);
    });
  }

  onSelectedFeetChange(event: number) {
    console.log('Selected feet changed:', event);
  }

  onSelectedInchesChange(event: number) {
    console.log('Selected inches changed:', event);
  }

  onSubmit(ngf): void {
    console.log('ngf', ngf);

    if (ngf.valid) {
      this.authService.login(ngf.form.value).subscribe(response => {
        console.log('response', response);
      });
    }
  }
}
