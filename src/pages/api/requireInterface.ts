import axios from "axios";

// 设置基础请求地址
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 3000,
});

