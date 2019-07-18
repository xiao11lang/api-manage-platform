import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import dayjs from "dayjs";
import { agreeApply, getApply, deleteExistApply } from "./../../../api/apply";

export function ApplyPerson(props) {
  const [applyList, setApplyList] = useState([]);
  useEffect(() => {
    getApply({ teamId: props.teamId }).then(res => {
      setApplyList(res.list);
    });
  }, [props.activeKey, props.teamId]);
  const deleteApply = id => {
    setApplyList(
      applyList.filter(item => {
        return item.id !== id;
      })
    );
  };
  const handleAgree = item => {
    agreeApply({
      teamId: item.team_id,
      fromId: item.from_id,
      applyId: item.id
    }).then(() => {
      deleteApply(item.id);
    });
  };
  const handleDelete = item => {
    deleteExistApply({
      applyId: item.id
    }).then(() => {
      deleteApply(item.id);
    });;
  };
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
            <Button type="danger" onClick={() => handleDelete(item)}>
              拒绝
            </Button>
          </>
        );
      },
      align: "left"
    }
  ];
  const dataSource = applyList.map((item, index) => {
    return Object.assign({}, item, {
      createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      key: index
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
