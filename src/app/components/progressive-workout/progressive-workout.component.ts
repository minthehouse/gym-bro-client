import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-progressive-workout',
  templateUrl: './progressive-workout.component.html',
  styleUrls: ['./progressive-workout.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProgresssiveWorkoutComponent {
  @Input() workout: any;
}
