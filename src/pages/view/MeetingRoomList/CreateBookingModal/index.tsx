import { MeetingRoomSearchResult } from "@/pages/admin/MeetingRoomManage";
import { clientApi } from "@/pages/api";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";

interface CreateBookingModalProps {
  isOpen: boolean;
  handleClose: Function;
  meetingRoom: MeetingRoomSearchResult;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface CreateBooking {
  meetingRoomId: number;
  rangeStartDate: Date;
  rangeStartTime: Date;
  rangeEndDate: Date;
  rangeEndTime: Date;
  note: string;
}

export const CreateBookingModal = (props: CreateBookingModalProps) => {
  const [form] = useForm<CreateBooking>();

  const handleOk = async () => {
    const values = form.getFieldsValue();
    values.meetingRoomId = props.meetingRoom.id;
    console.log(clientApi)

    const res = await clientApi.bookingAdd(values);
    if (res) {
      message.success("预定成功");
      form.resetFields();
      props.handleClose();
    } 
  };

  return (
    <Modal
      title="创建会议室"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={"创建"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item label="会议室名称" name="meetingRoomId">
          {props.meetingRoom.name}
        </Form.Item>
        <Form.Item
          label="预定开始日期"
          name="rangeStartDate"
          rules={[{ required: true, message: "请输入预定开始日期!" }]}
        >
          <DatePicker placeholder="预定开始日期" />
        </Form.Item>
        <Form.Item
          label="预定开始时间"
          name="rangeStartTime"
          rules={[{ required: true, message: "请输入预定开始日期!" }]}
        >
          <TimePicker placeholder="预定开始时间" />
        </Form.Item>
        <Form.Item
          label="预定结束日期"
          name="rangeEndDate"
          rules={[{ required: true, message: "请输入预定结束日期!" }]}
        >
          <DatePicker placeholder="预定结束日期" />
        </Form.Item>
        <Form.Item
          label="预定结束时间"
          name="rangeEndTime"
          rules={[{ required: true, message: "请输入预定结束日期!" }]}
        >
          <TimePicker placeholder="预定结束时间" />
        </Form.Item>
        <Form.Item label="备注" name="note">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
