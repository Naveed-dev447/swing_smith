import axios, { AxiosInstance } from 'axios';
import * as api from './API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient: AxiosInstance = axios.create({
  baseURL: `${api.hostAPI}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
