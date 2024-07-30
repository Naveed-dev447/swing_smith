import { IUpdateWorkoutRequest, IUpdateWorkoutResponse, IWorkoutRequest, IWorkoutResponse } from "types/Workout";
import apiClient from "../../../../config/client";

export const GetWorkoutListAPICall = async (payload: IWorkoutRequest) => {
  const response = await apiClient.get<IWorkoutResponse>(`video/workouts/${payload.video_id}`);
  
  return response.data;
}


export const UpdateWorkoutListAPICall = async (payload: IUpdateWorkoutRequest): Promise<IWorkoutResponse> => {
  const response = await apiClient.post<IUpdateWorkoutResponse>(`video/update/workouts`, payload);
  
  return response.data;
}