import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./index.less";
import Table, { ColumnsType } from "antd/es/table";
import { Badge, Button, Form, Input, message } from "antd";
import { getMeetingRoomList } from "@/pages/api/client";
import { useForm } from "antd/es/form/Form";

interface GetMettingRoomList {
  name: string;
  capacity: number;
  equipment: string;
}

interface MeetingRoomSearchResult {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
  isBooked: boolean;
  createTime: Date;
  updateTime: Date;
}

const MeetingRoomList = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [meetingRoomResult, setMeetingRoomResult] = useState<
    Array<MeetingRoomSearchResult>
  >([]);

  const columns: ColumnsType<MeetingRoomSearchResult> = useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "容纳人数",
        dataIndex: "capacity",
      },
      {
        title: "位置",
        dataIndex: "location",
      },
      {
        title: "设备",
        dataIndex: "equipment",
      },
      {
        title: "描述",
        dataIndex: "description",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
      },
      {
        title: "上次更新时间",
        dataIndex: "updateTime",
      },
      {
        title: "预定状态",
        dataIndex: "isBooked",
        render: (_, record) =>
          record.isBooked ? (
            <Badge status="error">已被预订</Badge>
          ) : (
            <Badge status="success">可预定</Badge>
          ),
      },
      {
        title: "操作",
        render: (_, record) => (
          <div>
            <a href="#">预定</a>
          </div>
        ),
      },
    ],
    []
  );

  const searchMeetingRoom = useCallback(async (values: GetMettingRoomList) => {
    const res = await getMeetingRoomList(
      values.name,
      values.capacity,
      values.equipment,
      pageNo,
      pageSize
    );

    const { data, code } = res.data;
    if (code === 201 || code === 200) {
      setMeetingRoomResult(
        (data?.MeetingRooms || []).map((item: MeetingRoomSearchResult) => ({
          key: item.id,
          ...item,
        }))
      );
    } else {
      message.error(data || "系统繁忙，请稍后再试");
    }
  }, []);

  const [form] = useForm();

  useEffect(() => {
    searchMeetingRoom({
      name: form.getFieldValue("name"),
      capacity: form.getFieldValue("capacity"),
      equipment: form.getFieldValue("equipment"),
    });
  }, [pageNo, pageSize]);

  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form
          form={form}
          onFinish={searchMeetingRoom}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="会议室名称" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="容纳人数" name="capacity">
            <Input />
          </Form.Item>

          <Form.Item label="设备" name="equipment">
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索会议室
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="meetingRoomList-table">
        {console.log(meetingRoomResult)}
        <Table
          columns={columns}
          dataSource={meetingRoomResult}
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

export default MeetingRoomList;
