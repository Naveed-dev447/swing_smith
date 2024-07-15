import { ILogin, ILoginResponse } from "../../types/Login";
import apiClient from "../../config/client";



export const LoginAPICall = async (payload: ILogin) => {
    const response = await apiClient.post<ILoginResponse>(`login`, payload);
    return response.data;
}

export default LoginAPICall;