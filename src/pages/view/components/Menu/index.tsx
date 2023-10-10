import { Menu as AntdMenu, MenuProps } from "antd";
import styles from "./index.less";
import { Outlet, history, useLocation } from "umi";

const items: MenuProps["items"] = [
  {
    key: "/meetingRoomList",
    label: "会议室列表",
  },
  {
    key: "/bookingHistory",
    label: "预定历史",
  },
];

const Menu = () => {
  const localtion = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.menuArea}>
        <AntdMenu
          style={{ height: "100%" }}
          defaultSelectedKeys={[localtion.pathname.replace("/admin", "")]}
          items={items}
          onSelect={(e) => history.push(`${e.key}`)}
        />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
