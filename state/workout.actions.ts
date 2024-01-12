export class SetWorkouts {
  static readonly type = '[Workout] Set workouts';
  constructor(public payload: any) {}
}

export class SetCurrentWorkout {
  static readonly type = '[Workout] Set current workout';
  constructor(public payload: any) {}
}

export class SetWorkoutToEdit {
  static readonly type = '[Workout] Set selected workout to edit';
  constructor(public payload: any) {}
}
