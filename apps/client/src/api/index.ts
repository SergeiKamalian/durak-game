import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  removeTokens,
  getGuestId,
} from "../utils";

const API_URL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      const guestId = getGuestId();
      console.log(guestId);

      config.headers["guestId"] = guestId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.error(originalRequest);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/users/refresh`, {
            refreshToken,
          });

          setAccessToken(data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          removeTokens();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
export * from "./services";
