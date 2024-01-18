import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout',
  templateUrl: 'workout.page.html',
  styleUrls: ['workout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class WorkoutPage {
  constructor(private router: Router, private route: ActivatedRoute) {}

  sendEvent(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}
