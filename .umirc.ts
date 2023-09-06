import { defineConfig } from "umi";

export default defineConfig({
  mfsu: false,
  routes: [
    {
      path: "/",
      routes: [{ path: "/update_info", component: "UpdateInfo" }],
      // redirect: "/login",
    },
    // 公共模块
    { path: "/register", component: "Register" },
    { path: "/login", component: "Login" },
    // 用户模块

    // 后台管理相关模块
    {
      name: "后台管理系统",
      path: "admin",
      component: "admin/components/Menu",
      routes: [
        {
          path: "/admin/userManage",
          component: "admin/UserManage",
        },
      ],
    },

    { path: "/**/*", component: "ErrorPage" },
  ],
  npmClient: "pnpm",
});
