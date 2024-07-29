// interfaces/Workout.ts
export interface IRecommendedWorkout {
    id: number;
    type: string;
    total: number;
    done: number;
}

export interface IRecommendedWorkoutsResponse {
    status: number;
    data: IRecommendedWorkout[];
}
