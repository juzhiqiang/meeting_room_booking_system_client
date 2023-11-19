import { Link, Outlet, useNavigate } from "umi";
import styles from "./index.less";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getRolesInfo, isAdmin } from "@/unitls";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    !Object.keys(getRolesInfo()).length && navigate("/login", {});
  }, []);
  return (
    <div className={styles.main}>
      <header>
        <h1>会议室预定系统</h1>
        <div>
          <Link to="/update_info">
            <UserOutlined className={styles.icon} />
          </Link>
        </div>
      </header>
      <Outlet />
      <footer>juzhiqiang @2023 会议室预定系统</footer>
    </div>
  );
}
