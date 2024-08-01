export interface ILoginResponse {
    status: number;
    message: string;
    data?: any; 
    isFirstLogin : boolean
  }

  export interface ILogin{
    email: string;
    password: string;
  }
