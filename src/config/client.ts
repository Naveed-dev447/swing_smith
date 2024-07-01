import axios, { AxiosInstance } from 'axios';
import * as api from './API';

const apiClient: AxiosInstance = axios.create({
  baseURL: `${api.hostAPI}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZXQuYWxpcmF6YWFsaXNoZXJAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfQ1VTVE9NRVIiLCJleHAiOjE3MTUyMDAwODB9.69lwHrpKNMYgqsckzmoz6iWQ6BsNfgPjiTe5zYsrk53eZn3fUBFIvYfzX7DhgNzZp9UzLll7NVTt3p5XrrtMAQ'
  },
});

apiClient.interceptors.request.use(
  (config) => {
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
