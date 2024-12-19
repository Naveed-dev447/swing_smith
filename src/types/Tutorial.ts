export interface ITutorial {
  video_url: any;
  status: any;
  fileURL: string;
  drill_name: any;
  name: any;
  file_url: string;
  created_at: string;
  description: string;
  duration: number;
  file_name: string;
  id: number;
  short_des: string;
  tags: string;
  title: string;
}

export interface ITutorialResponse {
  status: number;
  data: ITutorial[];
  message: string;
}