import { Button, Form, Input, message } from "antd";
import styles from "./index.less";
import { login, register, registerCaptcha } from "../api";
import { useForm } from "antd/es/form/Form";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "umi";
import Countdown from "antd/es/statistic/Countdown";

export interface RegisterUser {
  username: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  email: string;
  captcha: string;
}

const Register = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [isClickCode, setIsClickCode] = useState(true);
  const [outTime, setOutTime] = useState(0);

  // 获取验证码
  const sendCaptcha = useCallback(async () => {
    if (!isClickCode) return;
    const address = form.getFieldValue("email");
    if (!address) return message.error("请输入邮箱地址");

    const res = await registerCaptcha(address);
    const { code, message: msg, data } = res.data;
    if (code === 201 || code === 200) {
      message.success(data);
      setIsClickCode(false);
      setOutTime(Date.now() + 1000 * 60);
    } else {
      setIsClickCode(true);
      message.error(data || "系统繁忙，请稍后再试");
    }
  }, []);

  const onFinish = useCallback(async (infos: RegisterUser) => {
    if (infos.password !== infos.confirmPassword)
      return message.error("两次密码不一致");

    const res = await register(infos);

    const { code, message: msg, data } = res.data;
    if (code === 201 || code === 200) {
      message.success("登录成功");

      console.log(res);
      navigate("/login");
    } else {
      message.error(data || "登录异常，请重新登录");
    }
  }, []);
  return (
    <div className={styles.register}>
      <h1>会议室预定系统</h1>
      <Form
        form={form}
        className={styles.form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <div className={styles.subtit}>注册账号</div>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: "请输入昵称" }]}
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
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{ required: true, message: "请再次输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入合法邮箱" },
          ]}
        >
          <Input />
        </Form.Item>
        <div className={styles.captchaWrapper}>
          <Form.Item
            label="验证码"
            name="captcha"
            labelCol={{ span: 9 }}
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input />
          </Form.Item>
          <Button
            type="primary"
            className={styles.sendcode}
            onClick={sendCaptcha}
            htmlType="button"
            disabled={!isClickCode}
          >
            {isClickCode ? (
              "发送验证码"
            ) : (
              <Countdown
                value={outTime}
                onFinish={() => setIsClickCode(true)}
                format="s 秒"
                valueStyle={{ color: "#333", fontSize: 14 }}
                className={styles.count}
              />
            )}
          </Button>
        </div>

        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <Link to="/login" className={styles.goLogin}>
            已有账号?去登录
          </Link>
        </Form.Item>
        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <Button className={styles.submit} type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>

      <footer>juzhiqiang @2023 会议室预定系统</footer>
    </div>
  );
};

export default Register;
