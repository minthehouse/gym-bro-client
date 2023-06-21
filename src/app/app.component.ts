import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateMachineService } from './service/state-machine.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private stateSubscription: Subscription;

  constructor(private stateMachineService: StateMachineService) {
    this.stateSubscription = this.stateMachineService.stateChange$.subscribe(
      (state: any) => {
        // Handle state change here
        console.log('State changed:', state);
        this.stateMachineService.navigate(state);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the state change subscription when the component is destroyed
    this.stateSubscription.unsubscribe();
  }
}
