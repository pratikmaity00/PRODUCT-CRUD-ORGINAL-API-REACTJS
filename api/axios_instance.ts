import axios from "axios";
import { base_url } from "./api_urls";

export const axiosInstance = axios.create({
  baseURL: base_url
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    const token = sessionStorage.getItem('JWT_TOKEN');
    if(token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


