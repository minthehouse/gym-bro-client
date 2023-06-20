import { Injectable } from '@angular/core';
import { stateMachine } from 'state/state-machine/state-machine';
import { interpret } from 'xstate';

@Injectable({ providedIn: 'root' })
export class StateMachineService {
  private machine = interpret(stateMachine).start();

  constructor() {
    this.machine.onTransition((state: any) => {
      const url = this.getStateUrl(state.value);
      this.navigateTo(url);
    });
  }

  private getStateUrl(state: string): string {
    // Map the state names to the corresponding URLs in your application
    switch (state) {
      case 'home':
        return '/home';
      case 'about':
        return '/about';
      case 'contact':
        return '/contact';
      default:
        return '/home'; // Default URL
    }
  }

  private navigateTo(url: string): void {
    // Use the Angular router to navigate to the specified URL
    // Ensure you have imported and injected the Angular router service
    // into this service before using it here
    // Example: this.router.navigate([url]);
  }

  sendEvent(event: string): void {
    this.machine.send(event);
  }
}
