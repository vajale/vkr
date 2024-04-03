import axios, { AxiosError, type AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
    // baseURL: baseUrl,
    // withCredentials: true,
});
