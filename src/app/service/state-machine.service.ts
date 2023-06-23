import { Injectable } from '@angular/core';
import { stateMachine } from 'state/state-machine/state-machine';
import { interpret, State } from 'xstate';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateMachineService {
  private machine = interpret(stateMachine).start();
  private stateChangeSubject = new Subject<State<any>>();

  public stateChange$: Observable<State<any>> =
    this.stateChangeSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.machine.onTransition((state: any) => {
      const url = this.getStateUrl(state.value);
      this.stateChangeSubject.next(state);
    });
  }

  private getStateUrl(state: string): string {
    // Map the state names to the corresponding URLs in your application
    switch (state) {
      case 'workout':
        return '/workout';
      case 'diet':
        return '/diet';
      case 'user':
        return '/user';
      case 'track':
        return '/track';
      default:
        return '/workout'; // Default URL
    }
  }

  public navigate(state: any): void {
    console.log('state', state);

    const url = this.getStateUrl(state.event.type);
    console.log('url', url);
    this.router.navigate([url], { relativeTo: this.route });
  }

  sendEvent(event: string): void {
    this.machine.send(event);
  }
}
