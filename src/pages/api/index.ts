import { axiosInstance } from "./requireInterface";
import { RegisterUser } from "../Register";
import { UpdatePassword } from "../UpdatePassword";
import { UserInfo } from "../UpdateInfo";
// 通过接口-------------------------------------------------------------------
// 获取用户信息
export const getUserInfo = async () => {
  return await axiosInstance.get("/user/info");
};

// 获取更新用户信息验证码
export const updateUserInfoCaptcha = async () => {
  return await axiosInstance.get("/user/update/captcha");
};

// 获取更新密码验证码
export const updatePasswordCaptcha = async (emial: string) => {
  return await axiosInstance.get("/user/update_password/captcha", {
    params: {
      address: emial,
    },
  });
};

// 客户端接口-------------------------------------------------------

// 登录接口
export const login = async (username: string, password: string) => {
  return await axiosInstance.post("/user/login", { username, password });
};

// 后台管理者登录
export const adminLogin = async (username: string, password: string) => {
  return await axiosInstance.post("/user/admin/login", { username, password });
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
  return await axiosInstance.get("/user/register-captcha", {
    params: {
      address: address,
    },
  });
};

// 更新密码
export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/update_password", data);
}

// 更新用户信息
export const updateInfo = async (data: UserInfo) => {
  return await axiosInstance.post("/user/update", data);
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

// 后台管理系列--------------------------------------------------------------------------------------
// 获取用户列表
export async function getUserList(
  username: string,
  nickName: string,
  email: string,
  pageNo: number,
  pageSize: number
) {
  return await axiosInstance.get("/user/list", {
    params: {
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    },
  });
}

export async function updateAdminInfo(data: UserInfo) {
  return await axiosInstance.post("/user/update/admin", data);
}

export async function updateAdminPassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/admin/update_password", data);
}
