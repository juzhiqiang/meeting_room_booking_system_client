import { axiosInstance } from "./requireInterface";
import { RegisterUser } from "../Register";
import { UpdatePassword } from "../UpdatePassword";
import { UserInfo } from "../UpdateInfo";
import { CreateMeetingRoom } from "../admin/MeetingRoomManage/EditMeetingRoom";
import dayjs from "dayjs";
import { SearchBooking } from "../admin/BookingManage";
import { CommonApi } from "./common";
import { ClientApi } from "./clients";
import { AdminApi } from "./admin";
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

// 会议室房间列表
export async function bookingList(
  searchBooking: SearchBooking,
  pageNo: number,
  pageSize: number
) {
  let bookingTimeRangeStart;
  let bookingTimeRangeEnd;

  if (searchBooking.rangeStartDate && searchBooking.rangeStartTime) {
    const rangeStartDateStr = dayjs(searchBooking.rangeStartDate).format(
      "YYYY-MM-DD"
    );
    const rangeStartTimeStr = dayjs(searchBooking.rangeStartTime).format(
      "HH:mm"
    );
    bookingTimeRangeStart = dayjs(
      rangeStartDateStr + " " + rangeStartTimeStr
    ).valueOf();
  }

  if (searchBooking.rangeEndDate && searchBooking.rangeEndTime) {
    const rangeEndDateStr = dayjs(searchBooking.rangeEndDate).format(
      "YYYY-MM-DD"
    );
    const rangeEndTimeStr = dayjs(searchBooking.rangeEndTime).format("HH:mm");
    bookingTimeRangeEnd = dayjs(
      rangeEndDateStr + " " + rangeEndTimeStr
    ).valueOf();
  }

  return await axiosInstance.get("/booking/list", {
    params: {
      username: searchBooking.username,
      meetingRoomName: searchBooking.meetingRoomName,
      meetingRoomPosition: searchBooking.meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
      pageNo: pageNo,
      pageSize: pageSize,
    },
  });
}

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

// 更新后台管理用户信息
export async function updateAdminInfo(data: UserInfo) {
  return await axiosInstance.post("/user/update/admin", data);
}

// 更新密码
export async function updateAdminPassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/admin/update_password", data);
}

// 获取会议室列表
export async function meetingRoomList(
  name: string,
  capacity: number,
  equipment: string,
  pageNo: number,
  pageSize: number
) {
  return await axiosInstance.get("/meeting-room/list", {
    params: {
      name,
      capacity,
      equipment,
      pageNo,
      pageSize,
    },
  });
}

// 删除会议室
export async function deleteMeetingRoom(id: number) {
  return await axiosInstance.delete("/meeting-room/" + id);
}

// 创建会议室
export async function createMeetingRoom(meetingRoom: CreateMeetingRoom) {
  return await axiosInstance.post("/meeting-room/create", meetingRoom);
}

// 查询单个会议室
export async function getRoomInfo(id: number | string) {
  return await axiosInstance.get("/meeting-room/" + id);
}

export async function updateRoomInfo(meetingRoom: any) {
  return await axiosInstance.put("/meeting-room/update", meetingRoom);
}

export async function apply(id: number) {
  return await axiosInstance.get("/booking/apply/" + id);
}

export async function reject(id: number) {
  return await axiosInstance.get("/booking/reject/" + id);
}

const commonApi = new CommonApi();
const clientApi = new ClientApi();
const adminApi = new AdminApi();

export { clientApi, commonApi, adminApi };
