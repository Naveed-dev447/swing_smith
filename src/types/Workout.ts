export interface IWorkoutRequest {
  category: string;
  type: string;
  video_id: string;
}

export interface IWorkoutResponse {
  status: number;
  data: {
    category: string;
    id: number;
    type: string;
    video_id: number;
    workout: { [key: string]: boolean };
  };
  message: string;
}


export interface IUpdateWorkoutRequest {
  id: number;
  category: string,
  type: string;
  workout: {
    [key: string]: boolean;
  };
}
export interface IUpdateWorkoutResponse {
  status: number;
  data: any[];
  message: string;
}
