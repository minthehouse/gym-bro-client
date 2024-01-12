export interface IExercise {
  id: number;
  workout_id: number;
  created_at: string;
  updated_at: string;
  weight: number;
  rep: number;
  exercise_type_id: number;
  ExerciseType: {
    name: string;
  };
  exercise_type_name: string;
}

export interface ISet {
  set_number: number;
  weight: string | null;
  rep: string | null;
  exercise_type_id: number;
}

export interface IExerciseDictionary {
  // ExerciseDictionary that I use in forms
  [exerciseName: string]: ISet[];
}
