export interface ITutorial {
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