import axios from "axios";
import Cookies from "js-cookie";
import { useAppStore } from "@/store";
import { refreshAccess } from "./auth";

export const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

// Creating an Axios instance with the baseURL and custom headers
const serverInstance = axios.create({
  baseURL: BASE_API,
});

serverInstance.interceptors.request.use(
  (config: any) => {
    config.headers = {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

serverInstance.interceptors.response.use(
  (response) => {
    const getAccessTokenState = useAppStore.getState().accessTokenState;

    if (
      [200, 201].includes(response.status) &&
      getAccessTokenState === "updated"
    )
      useAppStore.setState({ accessTokenState: "idle" });
    return Promise.resolve(response);
  },
  (error) => {
    console.log(error);
    const code = error && error.response ? error.response.status : 0;
    const getAccessTokenState = useAppStore.getState().accessTokenState;

    if (code === 401) {
      // if (error.response?.data?.detail?.includes("No active account found")) return Promise.reject(error);

      if (error.response?.data?.message === "Access token expired.") {
        if (
          getAccessTokenState === "idle" ||
          getAccessTokenState === "updated"
        ) {
          useAppStore.setState({ accessTokenState: "in-progress" });
          refreshAccess();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default serverInstance;
