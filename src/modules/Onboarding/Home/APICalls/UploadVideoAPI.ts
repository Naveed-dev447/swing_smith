import apiClient from '../../../../config/client';
import {IUploadVideoResponse} from '../../../../types/UploadVideo';

// API call
export const UploadVideoAPICall = async (payload: FormData) => {
  console.log('PAYLOAD', JSON.stringify(payload));

  const response = await apiClient.post<IUploadVideoResponse>(
    `upload/video`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      maxBodyLength: Infinity,
      timeout: 20000,
    },
  );
  return response.data;
};

export default UploadVideoAPICall;
