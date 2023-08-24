import { defineConfig } from "umi";

export default defineConfig({
  mfsu: false,
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/docs", component: "docs" },
    { path: "/login", component: "Login" },
    { path: "/*", component: "@/pages/ErrorPage.tsx" },
  ],
  npmClient: "pnpm",
});
