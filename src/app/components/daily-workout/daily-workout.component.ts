import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IWorkout } from 'state/workout.interface';

@Component({
  selector: 'app-daily-workout',
  templateUrl: './daily-workout.component.html',
  styleUrls: ['./daily-workout.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DailyWorkoutComponent {
  @Input() workout: IWorkout;
}
