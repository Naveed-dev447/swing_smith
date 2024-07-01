import apiClient from "../../config/client";

interface ILogin{
    email: string;
    password: string;
  }


export const LoginAPICall = async (payload: ILogin) => {
    const response = await apiClient.post<ILogin>(`login`, payload);
    return response.data;
}

export default LoginAPICall;