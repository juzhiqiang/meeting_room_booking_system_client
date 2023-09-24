import { Button, Form, Input, message } from "antd";
import styles from "./index.less";
import { getUserInfo, updatePassword, updatePasswordCaptcha } from "../api";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "umi";
import Countdown from "antd/es/statistic/Countdown";
import { isAdmin } from "@/unitls";

export interface UpdatePassword {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  captcha: string;
}

const UpdatePassword = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [isClickCode, setIsClickCode] = useState(true);
  const [outTime, setOutTime] = useState(0);

  const userInfo = async () => {
    const res = await getUserInfo();
    const { data } = res.data;
    if (res.status === 201 || res.status === 200) {
      form.setFieldValue("username", data.username);
      form.setFieldValue("email", data.email);
    }
  };

  useEffect(() => {
    if (isAdmin()) userInfo();
  }, []);

  // 获取验证码
  const sendCaptcha = useCallback(async () => {
    if (!isClickCode) return;
    const address = form.getFieldValue("email");
    if (!address) return message.error("请输入邮箱地址");

    const res = await updatePasswordCaptcha(address);
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

  const onFinish = useCallback(async (infos: UpdatePassword) => {
    if (infos.password !== infos.confirmPassword)
      return message.error("两次密码不一致");

    const res = isAdmin()
      ? await updatePassword({
          ...infos,
          username: form.getFieldValue("username"),
        })
      : await updatePassword(infos);

    const { message: msg, data } = res.data;
    if (res.status === 201 || res.status === 200) {
      message.success("密码修改成功").then(() => {
        !isAdmin() && navigate("/login", {});
      });
    } else {
      message.error(data || "系统繁忙，请稍后再试");
    }
  }, []);
  return (
    <div className={styles.register}>
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
        {!isAdmin() && (
          <>
            <div className={styles.subtit}>找回密码</div>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item
          label="新密码"
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
          <Input disabled={isAdmin()} />
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
          <Button className={styles.submit} type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePassword;
