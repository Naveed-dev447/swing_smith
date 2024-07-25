export interface IWorkoutRequest {
    category: string;
    type: string;
    video_id: string;
  }

  export interface IWorkoutResponse {
    status: number;
    data: any[]; // Will update API response
    message: string;
  }
  