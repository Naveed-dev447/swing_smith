interface SwingAnalysisPositives {
  Takeaway: string;
  Balance: string;
}

interface SwingAnalysisNegatives {
  BackswingPlane: string;
  HeadMovement: string;
}

interface SwingAnalysisWorkoutDrills {
  CoreStrength: string[];
  LowerBodyStrength: string[];
  Flexibility: string[];
}

interface SwingAnalysisGolfDrills {
  Takeaway: string[];
  Plane: string[];
  HeadMovement: string[];
}

interface Swing {
  Positives: SwingAnalysisPositives;
  Negatives: SwingAnalysisNegatives;
  SwingRating: number;
  SwingRhythm: number;
  Posture: number;
  WorkoutDrills: SwingAnalysisWorkoutDrills;
  GolfDrills: SwingAnalysisGolfDrills;
  VideoSuggestions: string[];
}

interface RecommendedTutorial {
  description: string;
  name: any;
  drill_name: any;
  status: any;
  id: number;
  title: string;
  short_des: string;
  duration: number;
  file_name: string;
  thumbnail: string;
}

export interface SwingAnalysis {
  id: number;
  file_url: string;
  analysis: Swing;
  recomended_tutorials: RecommendedTutorial[];
  created_at: string;
}

export interface SwingAnalysisResponse {
  status: number;
  data: SwingAnalysis;
  message: string;
}
