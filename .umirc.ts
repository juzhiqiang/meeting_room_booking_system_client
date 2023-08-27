import { defineConfig } from "umi";

export default defineConfig({
  mfsu: false,
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/register", component: "Register" },
    { path: "/login", component: "Login" },
    { path: "/updatePassword", component: "UpdatePassword" },
    { path: "/*", component: "@/pages/ErrorPage.tsx" },
  ],
  npmClient: "pnpm",
});
