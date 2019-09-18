import React, { useEffect } from "react";
import { Table, Button, Tooltip } from "antd";
import { getProjects, deleteProject } from "api/testProject";
import format from "until/format";
const { Column } = Table;
export function Test(props) {
  useEffect(() => {
    if (!props.id) return;
    getProjects({
      id: props.id
    }).then(res => {
      props.dispatch({
        type: "INIT",
        list: res.list
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);
  const handleDelete = async id => {
    try {
      const { status } = await deleteProject({ id });
      if (status === 1) {
        props.dispatch({
          type: "DELETE",
          id
        });
      }
    } catch (e) {}
  };
  const goToDetail = id => {
    props.history.push(`/api/test/projectSurvey?id=${id}`);
    localStorage.setItem('teamId',props.id)
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
      title: "描述",
      dataIndex: "project_des",
      align: "center",
      render(v) {
        return (
          <Tooltip title={v}>
            <div className="ellipsis width-200 inline-block">{v}</div>
          </Tooltip>
        );
      }
    },
    {
      title: "最后更新时间",
      dataIndex: "updatedAt",
      render(v) {
        return format(v);
      }
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
            <Button type="danger" onClick={() => handleDelete(item.id)}>
              删除
            </Button>
          </>
        );
      },
      align: "left"
    }
  ];
  const coulmns = columnConfig.map((column, index) => {
    return <Column key={index} align="center" {...column}></Column>;
  });
  return (
    <>
      <Table dataSource={props.list} className="top-20" rowKey="id">
        {coulmns}
      </Table>
    </>
  );
}
