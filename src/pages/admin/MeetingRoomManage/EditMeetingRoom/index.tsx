import {
  createMeetingRoom,
  getRoomInfo,
  meetingRoomList,
  updateRoomInfo,
} from "@/pages/api";
import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect } from "react";

interface EditMeetingRoom {
  isOpen: boolean;
  isEdit: string | "";
  handleClose: Function;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
export interface CreateMeetingRoom {
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
}

export function EditMeetingRoom(props: EditMeetingRoom) {
  const [form] = useForm<CreateMeetingRoom>();

  const handleOk = useCallback(
    async function () {
      const values = form.getFieldsValue();

      values.description = values.description || "";
      values.equipment = values.equipment || "";
      console.log(props.isEdit);
      const res =
        props.isEdit !== ""
          ? await updateRoomInfo({
              ...values,
              id: form.getFieldValue("id"),
            })
          : await createMeetingRoom(values);

      if (res.status === 201 || res.status === 200) {
        message.success(props.isEdit !== "" ? "更新成功" : "创建成功");
        form.resetFields();
        props.handleClose();
      } else {
        message.error(res.data.data);
      }
    },
    [props.isEdit]
  );

  useEffect(() => {
    form.resetFields();
    async function query() {
      if (!props.isEdit) {
        return;
      }
      const res = await getRoomInfo(props.isEdit);

      const { data } = res;
      if (res.status === 200 || res.status === 201) {
        form.setFieldValue("id", data.data.id);
        form.setFieldValue("name", data.data.name);
        form.setFieldValue("location", data.data.location);
        form.setFieldValue("capacity", data.data.capacity);
        form.setFieldValue("equipment", data.data.equipment);
        form.setFieldValue("description", data.data.description);
      } else {
        message.error(res.data.data);
      }
    }

    query();
  }, [props.isEdit]);

  return (
    <Modal
      title={props.isEdit !== "" ? "更新会议室" : "创建会议室"}
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={props.isEdit !== "" ? "更新" : "创建"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="会议室名称"
          name="name"
          rules={[{ required: true, message: "请输入会议室名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="位置"
          name="location"
          rules={[{ required: true, message: "请输入会议室位置!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="容纳人数"
          name="capacity"
          rules={[{ required: true, message: "请输入会议室容量!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="设备" name="equipment">
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
