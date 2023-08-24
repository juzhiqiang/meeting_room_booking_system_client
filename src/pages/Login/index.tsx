import { Button, Form, Input } from 'antd';
import styles from './index.less';

interface LoginUser {
  username: string;
  password: string;
}

const onSubmit = (infos: LoginUser) => {
  console.log(infos);
};

const Login = () => {
  return (
    <div className={styles.login}>
      <h1>会议室预定系统</h1>
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
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <div className={styles.create}>
            <a href="">创建账号</a>
            <a href="">忘记密码</a>
          </div>
        </Form.Item>
        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <Button className={styles.submit} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>

      <footer>juzhiqiang @2023 会议室预定系统</footer>
    </div>
  );
};

export default Login;
