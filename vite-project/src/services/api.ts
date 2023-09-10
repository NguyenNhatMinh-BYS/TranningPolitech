import axios from "axios";
import { env } from "./config.ts";
import { InternalAxiosRequestConfig } from "axios";
import { store } from "app/store";

const instance = axios.create({
  baseURL: env.VITE_API_ENDPOINT,
  timeout: 15000,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (store.getState().auth.userToken) {
      config.headers["Authorization"] = `Bearer ${
        store.getState().auth.userToken
      }`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
