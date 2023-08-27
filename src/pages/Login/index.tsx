import { Button, Form, Input, message } from "antd";
import styles from "./index.less";
import { login } from "../api";
import { Link } from "umi";

interface LoginUser {
  username: string;
  password: string;
}

const onSubmit = async (infos: LoginUser) => {
  const res = await login(infos.username, infos.password);

  const { code, message: msg, data } = res.data;
  if (code === 201 || code === 200) {
    message.success("登录成功");
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
    localStorage.setItem("user_info", JSON.stringify(data.userInfo));
    console.log(res);
  } else {
    message.error(data || "登录异常，请重新登录");
  }
};

const Login = () => {
  return (
    <div className={styles.login}>
      <Form
        className={styles.form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <div className={styles.subtit}>登录</div>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <div className={styles.create}>
            <Link to="/register">创建账号</Link>
            <Link to="/updatePassword">忘记密码</Link>
          </div>
        </Form.Item>
        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <Button className={styles.submit} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
