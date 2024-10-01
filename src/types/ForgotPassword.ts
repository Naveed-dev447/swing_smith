export interface IForgotPasswordOTPRequestPayload {
    email: string;
}
export interface IResetPasswordPayload {
    code: string;
    email: string;
    password: string;
}

export interface IForgotPasswordOTPResponse {
    status: number;
    data: any[];
    message: string;
}