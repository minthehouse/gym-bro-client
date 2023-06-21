import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.page.html',
  styleUrls: ['./track-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class WorkoutTrackPage implements OnInit {
  workoutList: { set: number; weight: string; reps: string }[] = [
    { set: 1, weight: '', reps: '' },
  ];

  constructor() {}

  ngOnInit() {}

  addRow() {
    this.workoutList.push({
      set: this.workoutList.length + 1,
      weight: '',
      reps: '',
    });
  }
}
