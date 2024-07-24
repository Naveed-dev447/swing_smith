import { IAnalysisResponse, IUploadedPayload } from '../../../../types/AnalysisVideo';
import apiClient from '../../../../config/client';

// API call
export const AnalysisVideoAPICall = async (payload: IUploadedPayload) => {
  console.log('PAYLOAD of analysis video API call', payload);

  const response = await apiClient.post<IAnalysisResponse>( `gemini/analysis/video`,payload);
  return response.data;
};

export default AnalysisVideoAPICall;
