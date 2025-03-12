import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface UseAxiosOptions {
  axiosOptions?: AxiosRequestConfig;
  isPrivate?: boolean;
}

export const useAxios = ({
  axiosOptions = {},
  isPrivate = true,
}: UseAxiosOptions = {}): AxiosInstance => {
  const token = "";

  const baseConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(isPrivate && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...axiosOptions,
  };

  console.log("baseConfig", baseConfig)

  return axios.create(baseConfig);
};
