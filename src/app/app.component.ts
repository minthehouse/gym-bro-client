import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StateMachineService } from './service/state-machine.service';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, HttpClientModule, MatNativeDateModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private stateSubscription: Subscription;

  constructor(private stateMachineService: StateMachineService, private storageService: StorageService) {
    this.stateSubscription = this.stateMachineService.stateChange$.subscribe((state: any) => {
      // Handle state change here
      console.log('State changed:', state);
      this.stateMachineService.navigate(state);
    });
  }

  async ngOnInit(): Promise<void> {
    await this.storageService.init();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the state change subscription when the component is destroyed
    this.stateSubscription.unsubscribe();
  }
}
