export class SetWorkouts {
  static readonly type = '[Workout] Set user workouts';
  constructor(public payload: any) {}
}

export class SetCurrentWorkout {
  static readonly type = '[Workout] Set user current workout';
  constructor(public payload: any) {}
}
