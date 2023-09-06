import { Menu as AntdMenu, MenuProps } from "antd";
import styles from "./index.less";
import { useEffect, useState } from "react";
import { Outlet } from "umi";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "会议室管理",
  },
  {
    key: "2",
    label: "预定管理",
  },
  {
    key: "3",
    label: "用户管理",
  },
  {
    key: "4",
    label: "统计",
  },
];

const type: any = {
  admin: "管理员",
  user: "vip用户",
};

const Menu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menuArea}>
        <AntdMenu defaultSelectedKeys={["3"]} items={items} />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
