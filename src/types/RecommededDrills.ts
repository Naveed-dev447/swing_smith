export interface IRecommendedDrill {
  duration: string;
  file_url: any;
  title: any;
  drill_name: string;
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
