// interfaces/Workout.ts
export interface IRecommendedWorkout {
    duration: string;
    status: any;
    file_name: any;
    file_url: any;
    title: any;
    name: any;
    description: string;
    drill_name: any;
    id: number;
    type: string;
    total: number;
    done: number;
}

export interface IRecommendedWorkoutsResponse {
    status: number;
    data: IRecommendedWorkout[];
}
