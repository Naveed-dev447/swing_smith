
import { ITipsResponse } from "types/Tips";
import apiClient from "../../../../config/client";



// API call  

export const GetTipAPICall = async () => { 
    const response = await apiClient.get<ITipsResponse>(`upload/tips`);
    return response.data;
}

export default GetTipAPICall;