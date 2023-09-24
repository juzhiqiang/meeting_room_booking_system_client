// 获取缓存在浏览器的信息
export const getRolesInfo = () => {
  const rolesJsonStr = window.localStorage.getItem("roles");
  return JSON.parse(rolesJsonStr || "{}");
};

// 是否是后台管理系统
export const isAdmin = () => getRolesInfo().roleKey === "admin";
