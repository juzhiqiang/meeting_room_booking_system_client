import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Table,
  TimePicker,
  message,
} from "antd";
import styles from "./index.less";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { BookingSearchResult, SearchBooking } from "./type";
import { bookingList, commonApi } from "@/pages/api";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

// 获取用户信息
const getUserInfo = () => {
  const userInfoStr = localStorage.getItem("user_info");
  if (userInfoStr) {
    return JSON.parse(userInfoStr);
  }
};

const BookingHistory = () => {
  const [form] = useForm();
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [bookingSearchResult, setBookingSearchResult] = useState<
    Array<BookingSearchResult>
  >([]);
  const [num, setNum] = useState(0);

  const searchBooking = async (values: SearchBooking) => {
    const res = await bookingList(values, pageNo, pageSize);

    try {
      const { data } = res.data;
      setBookingSearchResult(
        data.bookings.map((item: BookingSearchResult) => {
          return {
            key: item.id,
            ...item,
          };
        })
      );
    } catch (error) {
      message.error("系统繁忙，请稍后再试");
    }
  };

  const changePage = function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  };

  const changeStatus = async (id: number) => {
    const res = await commonApi.unbind(id);
    console.log(res);

    if (res.status === 201 || res.status === 200) {
      message.success("状态更新成功");
      setNum(Math.random());
    } else {
      message.error(res.data.data);
    }
  };

  useEffect(() => {
    ;
    searchBooking({
      username: getUserInfo().username,
      meetingRoomName: form.getFieldValue("meetingRoomName"),
      meetingRoomPosition: form.getFieldValue("meetingRoomPosition"),
      rangeStartDate: form.getFieldValue("rangeStartDate"),
      rangeStartTime: form.getFieldValue("rangeStartTime"),
      rangeEndDate: form.getFieldValue("rangeEndDate"),
      rangeEndTime: form.getFieldValue("rangeEndTime"),
    });
  }, [pageNo, pageSize, num]);

  const columns: ColumnsType<BookingSearchResult> = [
    {
      title: "会议室名称",
      dataIndex: "room",
      render(_, record) {
        return record.room.name;
      },
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      render(_, record) {
        return dayjs(new Date(record.startTime)).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      render(_, record) {
        return dayjs(new Date(record.endTime)).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "审批状态",
      dataIndex: "status",
      onFilter: (value, record) => record.status.startsWith(value as string),
      filters: [
        {
          text: "审批通过",
          value: "审批通过",
        },
        {
          text: "审批驳回",
          value: "审批驳回",
        },
        {
          text: "申请中",
          value: "申请中",
        },
        {
          text: "已解除",
          value: "已解除",
        },
      ],
    },
    {
      title: "预定时间",
      dataIndex: "createTime",
      render(_, record) {
        return dayjs(new Date(record.createTime)).format("YYYY-MM-DD hh:mm:ss");
      },
    },
    {
      title: "备注",
      dataIndex: "note",
    },
    {
      title: "描述",
      dataIndex: "description",
    },
    {
      title: "操作",
      render: (_, record) =>
        record.status === "申请中" ? (
          <div>
            <Popconfirm
              title="解除申请"
              description="确认解除吗？"
              onConfirm={() => changeStatus(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">解除预定</a>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

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
      <div className="bookingHistory-table">
        <Table
          columns={columns}
          dataSource={bookingSearchResult}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
          }}
        />
      </div>
    </div>
  );
};

export default BookingHistory;
