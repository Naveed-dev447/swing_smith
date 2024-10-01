import apiClient from '../../../config/client';
import { IForgotPasswordOTPResponse, IResetPasswordPayload } from '../../../types/ForgotPassword';


export const ForgotPasswordAPI = async (payload: IResetPasswordPayload): Promise<IForgotPasswordOTPResponse> => {

  const response = await apiClient.post<IForgotPasswordOTPResponse>('reset-password', payload);
  return response.data;
};
