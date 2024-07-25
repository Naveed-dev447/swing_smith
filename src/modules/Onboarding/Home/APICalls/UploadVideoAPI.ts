import apiClient from '../../../../config/client';
import { IUploadVideoResponse } from '../../../../types/UploadVideo';

// API call
export const UploadVideoAPICall = async (payload: FormData) => {

  const response = await apiClient.post<IUploadVideoResponse>(
    `gemini/upload/video`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      maxBodyLength: Infinity,
      timeout: 30000,
    },
  );
  return response.data;
};

export default UploadVideoAPICall;
