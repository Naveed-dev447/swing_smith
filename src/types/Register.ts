interface IDataItem {
    id: number;
    name: string;
  }
  
export interface IRegisterResponse {
    data: IDataItem[];
    message: string;
    status: number;
  }
  
export interface IRegister {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }