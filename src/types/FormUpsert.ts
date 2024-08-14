
export interface IFormUpsert {
  playing_since: string | null;
  practice_info: string | null;
  skill_level: string | null;
  want_to_improve: string | null;
  have_coach: string | null;
  equipment_use: string | null;
  content_medium: string | null;
}

export interface IFormUpsertResponse {
  status: string;
  data: any;
  message: string;
}
