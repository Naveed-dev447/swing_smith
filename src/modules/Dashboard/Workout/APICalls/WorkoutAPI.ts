import { IWorkoutRequest, IWorkoutResponse } from "types/Workout";
import apiClient from "../../../../config/client";

export const GetWorkoutListAPICall = async (payload: IWorkoutRequest) => {
  const response = await apiClient.post<IWorkoutResponse>(`video/workouts`, payload);
  return response.data;
}