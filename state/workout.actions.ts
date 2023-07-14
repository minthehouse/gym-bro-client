export class SetWorkoutStartTime {
  static readonly type = '[Workout] Set start time';
  constructor(public payload: any) {}
}

export class SetCurrentWorkout {
  static readonly type = '[Workout] Set current workout';
  constructor(public payload: any) {}
}
