import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetCurrentWorkout, SetWorkouts } from './workout.actions';

export class WorkoutStateModel {
  public current: any;
  public list: any;
}

@State<WorkoutStateModel>({
  name: 'workouts',
  defaults: {
    current: null,
    list: null,
  },
})
@Injectable()
export class WorkoutState {
  @Action(SetWorkouts)
  setWorkouts({ setState }: StateContext<WorkoutStateModel>, { payload }: SetWorkouts) {
    setState((state: WorkoutStateModel) => ({ ...state, list: payload }));
  }
  @Action(SetCurrentWorkout)
  setCurrentWorkout({ setState }: StateContext<WorkoutStateModel>, { payload }: SetCurrentWorkout) {
    // const filteredWorkout = removeEmptyArrays(payload);
    // console.log('filteredWorkout', filteredWorkout);
    setState((state: WorkoutStateModel) => ({ ...state, current: payload }));
  }
}

const removeEmptyArrays = workout => {
  // Get the keys of the workout object
  const keys = Object.keys(workout);

  // Filter out keys with empty arrays
  const nonEmptyWorkout = keys
    .filter(key => workout[key].length > 0)
    .reduce((obj, key) => {
      obj[key] = workout[key];
      return obj;
    }, {});

  return nonEmptyWorkout;
};
