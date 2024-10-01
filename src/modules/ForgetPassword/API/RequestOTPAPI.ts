import { IForgotPasswordOTPResponse, IForgotPasswordOTPRequestPayload } from '../../../types/ForgotPassword';
import apiClient from '../../../config/client';


export const RequestOTPAPI = async (payload: IForgotPasswordOTPRequestPayload) => {


    const response = await apiClient.post<IForgotPasswordOTPResponse>('reset-password-request', payload);

    return response.data;
}

export default RequestOTPAPI;
