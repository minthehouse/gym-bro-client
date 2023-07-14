import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetCurrentWorkout, SetWorkoutStartTime } from './workout.actions';

export class WorkoutStateModel {
  public workoutStartTime: any;
  public current: any;
}

@State<WorkoutStateModel>({
  name: 'workout',
  defaults: {
    workoutStartTime: null,
    current: null,
  },
})
@Injectable()
export class WorkoutState {
  @Action(SetCurrentWorkout)
  setCurrentWorkout({ setState }: StateContext<WorkoutStateModel>, { payload }: SetCurrentWorkout) {
    setState((state: WorkoutStateModel) => ({ ...state, current: payload }));
  }

  @Action(SetWorkoutStartTime)
  setWorkoutStartTime({ setState }: StateContext<WorkoutStateModel>, { payload }: SetWorkoutStartTime) {
    setState((state: WorkoutStateModel) => ({ ...state, workoutStartTime: payload }));
  }
}
