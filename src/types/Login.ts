export interface ILoginResponse {
    status: number;
    message: string;
    data?: any; // Adjust based on actual API response structure
  }

  export interface ILogin{
    email: string;
    password: string;
  }
