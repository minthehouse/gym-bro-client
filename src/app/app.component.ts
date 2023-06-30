import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StateMachineService } from './service/state-machine.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, HttpClientModule],
})
export class AppComponent implements OnDestroy {
  private stateSubscription: Subscription;

  constructor(private stateMachineService: StateMachineService) {
    this.stateSubscription = this.stateMachineService.stateChange$.subscribe((state: any) => {
      // Handle state change here
      console.log('State changed:', state);
      this.stateMachineService.navigate(state);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the state change subscription when the component is destroyed
    this.stateSubscription.unsubscribe();
  }
}
