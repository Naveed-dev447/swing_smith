export interface IResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordResponse {
  status: number;
  data: any[];
  message: string;
}