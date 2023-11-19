import {
  Badge,
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Table,
  TimePicker,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { UserSearchResult } from "../UserManage";
import { MeetingRoomSearchResult } from "../MeetingRoomManage";
import dayjs from "dayjs";

export interface SearchBooking {
  username: string;
  meetingRoomName: string;
  meetingRoomPosition: string;
  rangeStartDate: Date;
  rangeStartTime: Date;
  rangeEndDate: Date;
  rangeEndTime: Date;
}
interface BookingSearchResult {
  id: number;
  startTime: string;
  endTime: string;
  status: string;
  note: string;
  createTime: string;
  updateTime: string;
  user: UserSearchResult;
  room: MeetingRoomSearchResult;
}
import styles from "./index.less";
import { useForm } from "antd/es/form/Form";
import { apply, bookingList, reject, unbind } from "@/pages/api";

const BookingManage = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [num, setNum] = useState<number>(0);
  const [bookingSearchResult, setBookingSearchResult] = useState<
    Array<BookingSearchResult>
  >([]);

  const columns: ColumnsType<BookingSearchResult> = [
    {
      title: "会议室名称",
      dataIndex: "room",
      render(_, record) {
        return record?.room?.name;
      },
    },
    {
      title: "会议室位置",
      dataIndex: "room",
      render(_, record) {
        return record?.room?.location;
      },
    },
    {
      title: "预定人",
      dataIndex: "user",
      render(_, record) {
        return record.user.username;
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
      render: (_, record) => (
        <div>
          {record.status !== "审批通过" && (
            <>
              <Popconfirm
                title="通过申请"
                description="确认通过吗？"
                onConfirm={() => changeStatus(record.id, "apply")}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">通过</a>
              </Popconfirm>
              <br />
              <Popconfirm
                title="驳回申请"
                description="确认驳回吗？"
                onConfirm={() => changeStatus(record.id, "reject")}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">驳回</a>
              </Popconfirm>
              <br />
            </>
          )}

          <Popconfirm
            title="解除申请"
            description="确认解除吗？"
            onConfirm={() => changeStatus(record.id, "unbind")}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">解除</a>
          </Popconfirm>
          <br />
        </div>
      ),
    },
  ];

  const changePage = function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  };

  const searchBooking = async (values: SearchBooking) => {
    const res = await bookingList(values, pageNo, pageSize);
    const { data, code } = res.data;
    if (code === 201 || code === 200) {
      setBookingSearchResult(
        data.bookings.map((item: BookingSearchResult) => {
          return {
            key: item.id,
            ...item,
          };
        })
      );
    } else {
      message.error(data || "系统繁忙，请稍后再试");
    }
  };

  async function changeStatus(
    id: number,
    status: "apply" | "reject" | "unbind"
  ) {
    const methods = {
      apply,
      reject,
      unbind,
    };
    const res = await methods[status](id);

    if (res.status === 201 || res.status === 200) {
      message.success("状态更新成功");
      setNum(Math.random());
    } else {
      message.error(res.data.data);
    }
  }

  const [form] = useForm();

  useEffect(() => {
    searchBooking({
      username: form.getFieldValue("username"),
      meetingRoomName: form.getFieldValue("meetingRoomName"),
      meetingRoomPosition: form.getFieldValue("meetingRoomPosition"),
      rangeStartDate: form.getFieldValue("rangeStartDate"),
      rangeStartTime: form.getFieldValue("rangeStartTime"),
      rangeEndDate: form.getFieldValue("rangeEndDate"),
      rangeEndTime: form.getFieldValue("rangeEndTime"),
    });
  }, [pageNo, pageSize, num]);

  return (
    <div className={styles.container}>
      <Form
        form={form}
        onFinish={searchBooking}
        name="search"
        layout="inline"
        colon={false}
      >
        <Form.Item className={styles.formItem} label="预定人" name="username">
          <Input />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="会议室名称"
          name="meetingRoomName"
        >
          <Input />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="预定开始日期"
          name="rangeStartDate"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="预定开始时间"
          name="rangeStartTime"
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="预定结束日期"
          name="rangeEndDate"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="预定结束时间"
          name="rangeEndTime"
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="位置"
          name="meetingRoomPosition"
        >
          <Input />
        </Form.Item>

        <Form.Item className={styles.formItem} label=" ">
          <Button type="primary" htmlType="submit">
            搜索预定申请
          </Button>
        </Form.Item>
      </Form>
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
  );
};

export default BookingManage;
