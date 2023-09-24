import { Avatar, Button, Form, Input, Upload, message } from "antd";
import styles from "./index.less";
import {
  getUserInfo,
  updateAdminInfo,
  updateInfo,
  updateUserInfoCaptcha,
} from "../api";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "umi";
import Countdown from "antd/es/statistic/Countdown";
import { getRolesInfo, isAdmin } from "@/unitls";

export interface UserInfo {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}

const UpdateInfo = () => {
  const [form] = useForm();
  const [isClickCode, setIsClickCode] = useState(true);
  const [outTime, setOutTime] = useState(0);
  const [headPic, setHeadPic] = useState("");

  // 获取用户信息
  const getInfo = async () => {
    const res = await getUserInfo();

    const { data } = res.data;

    if (res.status === 201 || res.status === 200) {
      form.setFieldValue("nickName", data.nickName);
      form.setFieldValue("email", data.email);
      setHeadPic(data.headPic);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  // 获取验证码
  const sendCaptcha = useCallback(async () => {
    if (!isClickCode) return;
    const address = form.getFieldValue("email");
    if (!address) return message.error("请输入邮箱地址");

    const res = await updateUserInfoCaptcha();
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

  // 修改信息
  const onFinish = useCallback(async (infos: UserInfo) => {
    const res = !isAdmin()
      ? await updateInfo({ ...infos, headPic })
      : await updateAdminInfo({ ...infos, headPic });

    const { code, message: msg, data } = res.data;
    if (code === 201 || code === 200) {
      message.success("修改成功");
    } else {
      message.error(data || "系统繁忙，请稍后再试");
    }
  }, []);

  // 文件上传功能
  const handleChange = (info: any) => {
    const { status } = info.file;
    if (status === "done") {
      setHeadPic(info.file.response.data);
      message.success(`${info.file.name} 文件上传成功`);
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };
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
        <Form.Item label="头像" name="headPic">
          <Upload
            listType="picture-circle"
            showUploadList={false}
            name="file"
            action="http://localhost:3000/user/upload"
            onChange={handleChange}
          >
            <img
              src={"http://localhost:3000/" + headPic}
              alt="avatar"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </Upload>
        </Form.Item>
        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入合法邮箱" },
          ]}
        >
          <Input disabled />
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
            修改信息
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateInfo;
