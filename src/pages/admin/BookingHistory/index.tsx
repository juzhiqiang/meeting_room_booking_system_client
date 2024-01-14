import { Button, DatePicker, Form, Input, TimePicker } from "antd";
import styles from "./index.less";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SearchBooking } from "../BookingManage";

// 获取用户信息
const getUserInfo = () => {
  const userInfoStr = localStorage.getItem("user_info");
  console.log(userInfoStr, 123);
  if (userInfoStr) {
    return JSON.parse(userInfoStr);
  }
};

const BookingHistory = () => {
  const [form] = useForm();
  const searchBooking = async (values: SearchBooking) => {};

  useEffect(() => {
    getUserInfo();
    searchBooking({
      username: "",
      meetingRoomName: form.getFieldValue("meetingRoomName"),
      meetingRoomPosition: form.getFieldValue("meetingRoomPosition"),
      rangeStartDate: form.getFieldValue("rangeStartDate"),
      rangeStartTime: form.getFieldValue("rangeStartTime"),
      rangeEndDate: form.getFieldValue("rangeEndDate"),
      rangeEndTime: form.getFieldValue("rangeEndTime"),
    });
  }, []);

  return (
    <div className={styles.container}>
      <Form
        className={styles.form}
        form={form}
        onFinish={searchBooking}
        name="search"
        layout="inline"
        colon={false}
      >
        <Form.Item label="会议室名称" name="meetingRoomName">
          <Input />
        </Form.Item>

        <Form.Item label="预定开始日期" name="rangeStartDate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="预定开始时间" name="rangeStartTime">
          <TimePicker />
        </Form.Item>

        <Form.Item label="预定结束日期" name="rangeEndDate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="预定结束时间" name="rangeEndTime">
          <TimePicker />
        </Form.Item>

        <Form.Item label="位置" name="meetingRoomPosition">
          <Input />
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            搜索预定历史
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingHistory;
