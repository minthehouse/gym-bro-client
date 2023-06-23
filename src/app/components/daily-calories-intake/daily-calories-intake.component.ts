import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-daily-calories-intake',
  templateUrl: './daily-calories-intake.component.html',
  styleUrls: ['./daily-calories-intake.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class DailyCaloriesIntakeComponent implements OnInit {
  constructor() {}

  public goalCalories = 2000;
  public foodTakenCalories = 500;
  public remainingCalories = 1500;

  ngOnInit() {}
}
