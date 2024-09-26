import apiClient from '../../../../config/client';
import { IUploadVideoResponse } from '../../../../types/UploadVideo';


export const UploadVideoAPICall = async (payload: FormData) => {
  try {
    const response = await apiClient.post<IUploadVideoResponse>(
      `gemini/upload/video`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        maxBodyLength: Infinity,
        timeout: 30000,
      }
    );

    return response.data;

  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        data: error.response.data || null,
      };
    } else if (error.request) {
      return { status: null, message: 'No response from server', data: null };
    } else {
      return { status: null, message: error.message, data: null };
    }
  }
};

export default UploadVideoAPICall;
