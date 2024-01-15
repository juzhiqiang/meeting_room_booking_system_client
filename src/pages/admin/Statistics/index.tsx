import { Button, DatePicker, Form, Select, message } from "antd";
import styles from "./index.less";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { MeetingRoomUsedData, UserBookingData } from "./type";
import dayjs from "dayjs";
import { adminApi } from "@/pages/api";
import { useForm } from "antd/es/form/Form";

const BookingHistory = () => {
  const [userBookingData, setUserBookingData] =
    useState<Array<UserBookingData>>();
  const [meetingRoomUsedData, setMeetingRoomUsedData] =
    useState<Array<MeetingRoomUsedData>>();

  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [form] = useForm();

  const getStatisticData = async (values: {
    startTime: string;
    endTime: string;
  }) => {
    const startTime = dayjs(values.startTime).format("YYYY-MM-DD");
    const endTime = dayjs(values.endTime).format("YYYY-MM-DD");

    const res = await adminApi.userBookingCount(startTime, endTime);
    setUserBookingData(res);

    const res2 = await adminApi.meetingRoomUsedCount(startTime, endTime);
    setMeetingRoomUsedData(res2);
  };

  useEffect(() => {
    const myChart = echarts.init(containerRef.current);
    if (!userBookingData) {
      return;
    }
    console.log(myChart);
    myChart.clear();
    console.log(123);
    myChart.setOption({
      title: {
        text: "用户预定情况",
      },
      tooltip: {},
      xAxis: {
        show: form.getFieldValue("chartType") === "bar",
        type: "category",
        data: userBookingData?.map((item) => item.username),
      },
      yAxis: {},
      series: [
        {
          name: "预定次数",
          type: form.getFieldValue("chartType"),
          data: userBookingData?.map((item) => {
            return {
              name: item.username,
              value: item.bookingCount,
            };
          }),
        },
      ],
    });
  }, [userBookingData]);

  useEffect(() => {
    const myChart = echarts.init(containerRef2.current);
    myChart.clear();
    if (!meetingRoomUsedData) {
      return;
    }

    myChart.setOption({
      title: {
        text: "会议室使用情况",
      },
      tooltip: {},
      xAxis: {
        show: form.getFieldValue("chartType") === "bar",
        data: meetingRoomUsedData?.map((item) => item.meetingRoomName),
      },
      yAxis: {},
      series: [
        {
          name: "使用次数",
          type: form.getFieldValue("chartType"),
          data: meetingRoomUsedData?.map((item) => {
            return {
              name: item.meetingRoomName,
              value: item.usedCount,
            };
          }),
        },
      ],
    });
  }, [meetingRoomUsedData]);

  return (
    <div className={styles.container}>
      <Form
        form={form}
        className={styles.form}
        onFinish={getStatisticData}
        name="search"
        layout="inline"
        colon={false}
      >
        <Form.Item label="开始日期" name="startTime">
          <DatePicker />
        </Form.Item>

        <Form.Item label="结束日期" name="endTime">
          <DatePicker />
        </Form.Item>

        <Form.Item label="图表类型" name="chartType" initialValue={"bar"}>
          <Select>
            <Select.Option value="pie">饼图</Select.Option>
            <Select.Option value="bar">柱形图</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.chartBox}>
        <div className={styles.chart} ref={containerRef}></div>
        <div className={styles.chart} ref={containerRef2}></div>
      </div>
    </div>
  );
};

export default BookingHistory;
