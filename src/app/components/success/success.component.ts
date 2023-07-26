import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DailyCaloriesIntakeComponent } from 'src/app/components/daily-calories-intake/daily-calories-intake.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, DailyCaloriesIntakeComponent],
})
export class SuccessComponent implements OnInit {
  @Input() achievement: any;
  constructor(private router: Router) {}

  ngOnInit() {}

  close() {
    this.router.navigate(['tabs', 'workout']);
  }
}
