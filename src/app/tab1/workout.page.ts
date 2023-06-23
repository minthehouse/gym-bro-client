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
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    console.log('hit on in it');
    // this.workoutService.getWorkouts().subscribe((workouts) => {
    //   console.log('workouts', workouts);
    // });

    // this.userService.getUsers().subscribe((users) => {
    //   console.log('users', users);
    // });

    // this.exerciseService.getExercises().subscribe((exercises) => {
    //   console.log('exercises', exercises);
    // });

    // this.exerciseService.getExerciseTypes().subscribe((exerciseTypes) => {
    //   console.log('exerciseTypes', exerciseTypes);
    // });
  }

  sendEvent(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}
