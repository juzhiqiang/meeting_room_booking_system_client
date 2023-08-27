import { Link, Outlet } from "umi";
import styles from "./index.less";

export default function Layout() {
  return (
    <div className={styles.main}>
      <header>
        <h1>会议室预定系统</h1>
        <div>
          <UserOutlined />
        </div>
      </header>
      <Outlet />
      <footer>juzhiqiang @2023 会议室预定系统</footer>
    </div>
  );
}
