import { ILogin, ILoginResponse } from "../../types/Login";
import apiClient from "../../config/client";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const LoginAPICall = async (payload: ILogin) => {
    const response = await apiClient.post<ILoginResponse>(`login`, payload);
    
    if (response.data.data) {
        await AsyncStorage.setItem('Token', response.data.data.token);
      }
    return response.data;
}

export default LoginAPICall;