import axios from "axios";
import { axiosInstance } from "./requireInterface";
import { RegisterUser } from "../Register";
import { UpdatePassword } from "../UpdatePassword";

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
