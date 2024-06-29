import apiClient from "../../config/client";



// Interface
interface IRegister {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }


// API call

export const RegisterAPICall = async (payload: IRegister) => {
    const response = await apiClient.post<IRegister>(`register`, payload);
    return response.data;
}

export default RegisterAPICall;