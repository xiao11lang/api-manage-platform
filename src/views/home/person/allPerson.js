import React, { useState, useEffect } from "react";
import { Table, Button, Select } from "antd";
import dayjs from "dayjs";
import { getAuthorities } from "../../../api/authority";
const { Option } = Select;

export function AllPerson() {
  const [allList, setAllList] = useState([]);
  useEffect(() => {
    getAuthorities({
      teamId: 25
    }).then(res => {
      setAllList(res.list);
    });
  }, []);
  const columnConfig = [
    {
      title: "用户名",
      dataIndex: "name"
    },
    {
      title: "性别",
      dataIndex: "sex"
    },
    {
      title: "权限",
      dataIndex: "userRole",
      render: item => {
        return (
          <Select defaultValue={item} style={{ width: 200 }}>
            <Option value="none">不设置</Option>
            <Option value="admin">设置为管理员</Option>
            <Option value="read">设置为只读成员</Option>
            <Option value="read_write">设置为读写成员 </Option>
          </Select>
        );
      }
    },
    {
      title: "最后更新时间",
      dataIndex: "updatedAt"
    },
    {
      title: "操作",
      render: () => {
        return (
          <>
            <Button type="danger">删除</Button>
          </>
        );
      },
      align: "left"
    }
  ];
  const dataSource = allList.map((item, index) => {
    return Object.assign({}, item, {
      updatedAt: dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
      key: index,
      sex: item.sex === "male" ? "男" : "女"
    });
  });
  return (
    <>
      <Table
        dataSource={dataSource}
        style={{ marginTop: 20 }}
        columns={columnConfig}
      />
    </>
  );
}
