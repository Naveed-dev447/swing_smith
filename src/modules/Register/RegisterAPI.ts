import apiClient from "../../config/client";
import { IRegister, IRegisterResponse } from "../../types/Register";



// Interface



// API call

export const RegisterAPICall = async (payload: IRegister) => {
    const response = await apiClient.post<IRegisterResponse>(`register`, payload);
    return response.data;
}

export default RegisterAPICall;