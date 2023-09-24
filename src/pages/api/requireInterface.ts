import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { refreshToken } from ".";

// 设置基础请求地址
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 3000,
});

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}
let refreshing = false;
const queue: PendingTask[] = [];

axiosInstance.interceptors.response.use(
  (response) => {
    let { data, config } = response;
    console.log(data);
    if (data.code === 401) {
      window.localStorage.setItem("roles", "{}");
      window.location.href = "/login";
    }
    return response;
  },
  async (error) => {
    let { data, config } = error.response;

    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        });
      });
    }
    if (data.code === 401 && !config.url.includes("/user/refresh")) {
      refreshing = true;

      const res = await refreshToken();

      refreshing = false;

      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(axiosInstance(config));
        });

        return axiosInstance(config);
      } else {
        message.error(res.data).then((res) => {
          window.location.href = "/login";
        });
      }
    } else {
      return error.response;
    }
  }
);
