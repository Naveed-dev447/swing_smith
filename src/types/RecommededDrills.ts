export interface IRecommendedDrill {
  id: number;
  video_id: number;
  name: string;
  description: string;
  status: number;
  created_at: string;
}

export interface IRecommendedDrillResponse {
  status: number;
  data: IRecommendedDrill[];
}
