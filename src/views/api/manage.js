import React from "react";
import { Table, Button } from "antd";
import { deleteProject } from "../../api/apiProject";
const { Column } = Table;
export function Manage(props) {
  const { list, dispatch } = props;
  const handleDelete = item => {
    deleteProject({ projectId: item.id }).then(() => {
      dispatch({ type: "DELETE", id: item.id });
    });
  };
  const goToDetail = id => {
    props.history.push(`/api/manage/projectSurvey?id=${id}`);
  };
  const columnConfig = [
    {
      title: "名称",
      dataIndex: "name"
    },
    {
      title: "版本号",
      dataIndex: "version"
    },
    {
      title: "类型",
      dataIndex: "project_type"
    },
    {
      title: "最后更新时间",
      dataIndex: "updatedAt"
    },
    {
      title: "操作",
      render: item => {
        return (
          <>
            <Button
              type="primary"
              className="right-10"
              onClick={() => props.modify(item)}
            >
              编辑
            </Button>
            <Button
              type="primary"
              className="right-10"
              onClick={() => goToDetail(item.id)}
            >
              查看
            </Button>
            <Button
              type="danger"
              onClick={() => {
                handleDelete(item);
              }}
            >
              删除
            </Button>
          </>
        );
      },
      align: "left"
    }
  ];
  const coulmns = columnConfig.map((column, index) => {
    return <Column key={index} align="center" {...column} />;
  });
  return (
    <>
      <Table dataSource={list} className="top-20" rowKey="id">
        {coulmns}
      </Table>
    </>
  );
}
