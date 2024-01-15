import { Button, Form, Input, Table, message, Image } from "antd";
import { useCallback, useEffect, useState } from "react";
import styles from "./index.less";
import { ColumnsType } from "antd/es/table";
import { getUserList } from "@/pages/api";
import dayjs from "dayjs";
interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

export interface UserSearchResult {
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  createTime: Date;
}
const columns: ColumnsType<UserSearchResult> = [
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "头像",
    dataIndex: "headPic",
    render: (value) => {
      return value ? (
        <Image width={50} src={`http://localhost:3000/${value}`} />
      ) : (
        ""
      );
    },
  },
  {
    title: "昵称",
    dataIndex: "nickName",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "注册时间",
    dataIndex: "createTime",
    render: (value) => {
      return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
];

const UserManage = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageTotal, setPageTotal] = useState<number>(20);
  const [userResult, setUserResult] = useState<UserSearchResult[]>();

  const searchUser = useCallback(
    async (values: SearchUser) => {
      const res = await getUserList(
        values.username,
        values.nickName,
        values.email,
        pageNo,
        pageSize
      );

      const { data, code } = res.data;
      if (code === 201 || code === 200) {
        setUserResult(
          data.users.map((item: UserSearchResult) => {
            return {
              key: item.username,
              ...item,
            };
          })
        );
        setPageTotal(data.totalCount);
      } else {
        message.error(data || "系统繁忙，请稍后再试");
      }
    },
    [pageNo, pageSize]
  );

  useEffect(() => {
    searchUser({
      username: "",
      email: "",
      nickName: "",
    });
  }, [pageNo, pageSize]);

  const changePage = (pageNo: number, pageSize: number) => {
    setPageNo(pageNo);
    setPageSize(pageSize);
  };

  return (
    <div className={styles.container}>
      <div className="userManage-form">
        <Form onFinish={searchUser} name="search" layout="inline" colon={false}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="昵称" name="nickName">
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ type: "email", message: "请输入合法邮箱地址!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索用户
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.userManageTable}>
        <Table
          columns={columns}
          dataSource={userResult}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            total: pageTotal,
            onChange: changePage,
          }}
        />
      </div>
    </div>
  );
};

export default UserManage;
