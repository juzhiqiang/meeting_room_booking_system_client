import { Menu as AntdMenu, MenuProps } from "antd";
import styles from "./index.less";
import { Outlet, history, useLocation } from "umi";

const items: MenuProps["items"] = [
  {
    key: "/meetingRoomManage",
    label: "会议室管理",
  },
  {
    key: "/bookingManage",
    label: "预定管理",
  },
  {
    key: "/userManage",
    label: "统计",
  },
  {
    key: "/userManage",
    label: "用户管理",
  },
  {
    key: "/updateInfo",
    label: "信息修改",
  },
  {
    key: "/updatePassword",
    label: "密码修改",
  },
];

const type: any = {
  admin: "管理员",
  user: "vip用户",
};

const Menu = () => {
  const localtion = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.menuArea}>
        <AntdMenu
          style={{ height: "100%" }}
          defaultSelectedKeys={[localtion.pathname.replace("/admin", "")]}
          items={items}
          onSelect={(e) => history.push(`/admin${e.key}`)}
        />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
