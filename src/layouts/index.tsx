import { Link, Outlet } from "umi";
import styles from "./index.less";
import { UserOutlined } from "@ant-design/icons";

export default function Layout() {
  return (
    <div className={styles.main}>
      <header>
        <h1>会议室预定系统</h1>
        <div>
          <Link to="/update_info"><UserOutlined className={styles.icon} /></Link>
          
        </div>
      </header>
      <Outlet />
      <footer>juzhiqiang @2023 会议室预定系统</footer>
    </div>
  );
}
