import apiClient from '../../config/client';
import { IResetPasswordPayload, IResetPasswordResponse } from '../../types/ResetPassword';

export const ResetPasswordAPI = async (payload: IResetPasswordPayload): Promise<IResetPasswordResponse> => {
  const response = await apiClient.post<IResetPasswordResponse>('reset-password-request', payload);
  return response.data;
};
