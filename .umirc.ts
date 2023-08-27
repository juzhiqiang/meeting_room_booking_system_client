import { defineConfig } from "umi";

export default defineConfig({
  mfsu: false,
  routes: [
    {
      path: "/",
      routes: [{ path: "/update_info", component: "UpdateInfo" }],
      // redirect: "/login",
    },
    { path: "/register", component: "Register" },
    { path: "/login", component: "Login" },
    { path: "/updatePassword", component: "UpdatePassword" },
    { path: "/**/*", component: "ErrorPage" },
  ],
  npmClient: "pnpm",
});
