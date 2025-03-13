import { getToken } from "@/libs/auth.libs";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface UseAxiosOptions {
  axiosOptions?: AxiosRequestConfig;
  isPrivate?: boolean;
}

export const useAxios = ({
  axiosOptions = {},
  isPrivate = true,
}: UseAxiosOptions = {}): AxiosInstance => {
  const [token, setToken] = useState<string | undefined>("");

  useEffect(() => {
    async function getTokenInfo() {
      const token = await getToken();

      console.log("TOKNE: ", token);

      setToken(token);
    }

    getTokenInfo();
  }, []);

  const baseConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(isPrivate && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...axiosOptions,
  };

  // console.log("baseConfig", baseConfig);

  return axios.create(baseConfig);
};
