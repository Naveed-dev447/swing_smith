import { IUpdateWorkoutRequest, IUpdateWorkoutResponse, IWorkoutDrillResponse, IWorkoutDrillUpdatePayload, IWorkoutRequest, IWorkoutResponse } from "types/Workout";
import apiClient from "../../../../config/client";

export const GetWorkoutListAPICall = async (id: number) => {
  const response = await apiClient.get<IWorkoutResponse>(`video/workouts/${id}`);

  return response.data;
}


export const UpdateWorkoutListAPICall = async (payload: IUpdateWorkoutRequest): Promise<IWorkoutResponse> => {
  const response = await apiClient.post<IUpdateWorkoutResponse>(`video/update/workouts`, payload);

  return response.data;
}

export const GetWorkoutDrillAPICall = async (id: string) => {
  const response = await apiClient.get<IWorkoutDrillResponse>(`video/view/drill/${id}`);

  return response.data;

}

export const UpdateWorkoutDrillAPICall = async (payload: IWorkoutDrillUpdatePayload) => {
  const response = await apiClient.post<IUpdateWorkoutResponse>(`video/update/drills`, payload);

  return response.data;
}