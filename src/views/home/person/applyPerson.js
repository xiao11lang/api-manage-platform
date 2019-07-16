import React from "react";
import { Table, Button } from "antd";
import dayjs from "dayjs";
import { agreeApply } from "./../../../api/apply";
const handleAgree = item => {
  agreeApply({
    teamId: item.team_id,
    fromId: item.from_id,
    applyId: item.id
  }).then(() => {
    item.deleteApply(item.id);
  });
};
const { Column } = Table;
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
    title: "申请时间",
    dataIndex: "createdAt"
  },
  {
    title: "操作",
    render: item => {
      return (
        <>
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={() => handleAgree(item)}
          >
            同意
          </Button>
          <Button type="danger">拒绝</Button>
        </>
      );
    },
    align: "left"
  }
];
export function ApplyPerson(props) {
  const dataSource = props.applyList.map((item, index) => {
    return Object.assign({}, item, {
      createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      key: index
    });
  });
  const deleteApply = id => {
    props.setApplyList(
      props.applyList.filter(item => {
        return item.id !== id;
      })
    );
  };
  const coulmns = columnConfig.map((column, index) => {
    return (
      <Column
        key={index}
        align="center"
        {...column}
        deleteApply={deleteApply}
      />
    );
  });
  return (
    <>
      <Table dataSource={dataSource} style={{ marginTop: 20 }}>
        {coulmns}
      </Table>
    </>
  );
}
