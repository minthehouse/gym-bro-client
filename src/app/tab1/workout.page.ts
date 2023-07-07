import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExerciseService } from '../service/exercise.service';
import { UserService } from '../service/user.service';
import { WorkoutService } from '../service/workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: 'workout.page.html',
  styleUrls: ['workout.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class WorkoutPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private userService: UserService,
    private exerciseService: ExerciseService,
  ) {}

  ngOnInit(): void {}

  sendEvent(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}
