import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetCurrentWorkout, SetWorkoutToEdit, SetWorkouts } from './workout.actions';
import { IExerciseDictionary, ISet } from './workout.interface';

export interface Exercise {
  [exerciseName: string]: ISet[];
}

export interface WorkoutStateModel {
  current: IExerciseDictionary;
  list: any[];
  previous: IExerciseDictionary;
}

@State<WorkoutStateModel>({
  name: 'workouts',
  defaults: {
    current: null,
    list: null,
    previous: null,
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
    setState((state: WorkoutStateModel) => ({ ...state, current: payload }));
  }
  @Action(SetWorkoutToEdit)
  setWorkoutToEdit({ setState }: StateContext<WorkoutStateModel>, { payload }: SetCurrentWorkout) {
    setState((state: WorkoutStateModel) => ({ ...state, previous: payload }));
  }
}
