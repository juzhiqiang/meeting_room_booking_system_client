import { defineConfig } from "umi";

export default defineConfig({
  mfsu: false,
  routes: [
    // 公共模块
    { path: "/register", component: "Register" },
    { path: "/login", component: "Login" },
    // 用户模块
    {
      path: "/",
      name: "会议室管理系统",
      component: "view/components/Menu",
      routes: [
        { path: "/update_info", component: "UpdateInfo" },
        { path: "/meetingRoomList", component: "view/MeetingRoomList" },
        { path: "/bookingHistory", component: "view/BookingHistory" },
      ],
    },

    // 后台管理相关模块
    {
      name: "会议室后台管理系统",
      path: "admin",
      component: "admin/components/Menu",
      routes: [
        {
          path: "/admin/meetingRoomManage",
          component: "admin/MeetingRoomManage",
        },
        {
          path: "/admin/bookingManage",
          component: "admin/BookingManage",
        },
        {
          path: "/admin/statistics",
          component: "admin/Statistics",
        },
        {
          path: "/admin/userManage",
          component: "admin/UserManage",
        },
        {
          path: "/admin/updateInfo",
          component: "UpdateInfo",
        },
        {
          path: "/admin/updatePassword",
          component: "UpdatePassword",
        },
      ],
    },

    { path: "/**/*", component: "ErrorPage" },
  ],
  npmClient: "pnpm",
});
