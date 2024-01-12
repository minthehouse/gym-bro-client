import { IExercise, IExerciseDictionary, ISet } from 'state/workout.interface';

export function transformToExerciseDictionary(originalData: IExercise[]): IExerciseDictionary {
  const exerciseDictionary: IExerciseDictionary = {};

  originalData.forEach(originalSet => {
    const exerciseName = originalSet.ExerciseType.name.toLowerCase();

    if (!exerciseDictionary[exerciseName]) {
      exerciseDictionary[exerciseName] = [];
    }

    const transformedSet: ISet = {
      set_number: exerciseDictionary[exerciseName].length + 1,
      weight: originalSet.weight ? originalSet.weight.toString() : null,
      rep: originalSet.rep ? originalSet.rep.toString() : null,
      exercise_type_id: originalSet.exercise_type_id,
    };

    exerciseDictionary[exerciseName].push(transformedSet);
  });

  return exerciseDictionary;
}

export function trasnformToExerciseAttributes(originalData: IExerciseDictionary): ISet[] {
  const transformedData = ([] as ISet[]).concat(...Object.values(originalData));
  console.log('transformedData 12123: ', transformedData);
  return transformedData;
}
