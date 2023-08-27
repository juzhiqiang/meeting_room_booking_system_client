import axios from "axios";
import { axiosInstance } from "./requireInterface";
import { RegisterUser } from "../Register";
import { UpdatePassword } from "../UpdatePassword";
import { UserInfo } from "../UpdateInfo";

// 登录接口
export const login = async (username: string, password: string) => {
  return await axiosInstance.post("/user/login", { username, password });
};

// 注册接口
export const register = async ({
  username,
  nickName,
  password,
  email,
  captcha,
}: RegisterUser) => {
  return await axiosInstance.post("/user/register", {
    username,
    nickName,
    password,
    email,
    captcha,
  });
};

// 获取注册验证码
export const registerCaptcha = async (address: string) => {
  console.log(address);
  return await axiosInstance.get("/user/register-captcha", {
    params: {
      address: address,
    },
  });
};

// 获取更新密码验证码
export const updatePasswordCaptcha = async (emial: string) => {
  return await axiosInstance.get("/user/update_password/captcha", {
    params: {
      address: emial,
    },
  });
};

// 更新密码
export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/update_password", data);
}

// 获取用户信息
export const getUserInfo = async () => {
  return await axiosInstance.get("/user/info");
};

// 更新用户信息
export const updateInfo = async (data: UserInfo) => {
  return await axiosInstance.post("/user/update", data);
};

// 获取更新用户信息验证码
export const updateUserInfoCaptcha = async () => {
  return await axiosInstance.get("/user/update/captcha");
};

// 更新token
export const refreshToken = async () => {
  const res = await axiosInstance.get("/user/refresh", {
    params: {
      refresh_token: localStorage.getItem("refresh_token"),
    },
  });
  localStorage.setItem("access_token", res.data.access_token || "");
  localStorage.setItem("refresh_token", res.data.refresh_token || "");
  return res;
};
