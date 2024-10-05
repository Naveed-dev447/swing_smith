import { ILogin, ILoginResponse } from "../../types/Login";
import apiClient from "../../config/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShowToast } from "../../components/ShowToast";


export const LoginAPICall = async (payload: ILogin) => {
  const response = await apiClient.post<ILoginResponse>(`login`, payload);
  if (response.data.data) {
    const { token, avatar } = response.data.data;

    if (token) {
      await AsyncStorage.setItem('Token', token);
    } else if (avatar) {
      await AsyncStorage.setItem('profile', avatar);
    }
    return response.data;
  }
}

export default LoginAPICall;