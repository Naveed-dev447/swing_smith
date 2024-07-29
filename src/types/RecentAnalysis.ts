export interface IRecentAnalysis {
  id: number;
  user_id: number;
  swing_analysis: string;
  thumbnail: string;
  file_url: string;
  swing_rating: number;
  swing_rhythm: number;
  posture: number;
  created_at: string;
}

export interface IRecentAnalysisResponse {
  status: number;
  data: IRecentAnalysis[];
}
