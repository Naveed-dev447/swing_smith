
export interface IProfile {
    id: number;
    name: string;
    email: string;
    created_at: string;
  }
  
  export interface IProfileResponse {
    status: number;
    data: IProfile[];
  }
  