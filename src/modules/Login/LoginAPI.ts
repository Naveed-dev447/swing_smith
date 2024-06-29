import apiClient from "../../config/client";



// Interface
interface ILogin{
    email: string;
    password: string;
  }


// API call

export const LoginAPICall = async (payload: ILogin) => {
    const response = await apiClient.post<ILogin>(`login`, payload);
    return response.data;
}

export default LoginAPICall;