import React, { useEffect, useState, useMemo } from "react";
import { Table, Button } from "antd";
import { addTopGroup, getGroups, deleteGroup } from "api/testGroup";
import { getTestInstances } from "api/testInstance";
import { GeneralGroup, GeneralList } from "@/components";
import format from "until/format";
import ApiCreate from "./apiDocument/apiCreate";
export default function ProjectDocument(props) {
  const id = props.search.split("=")[1];
  const [groupList, setGroupList] = useState([]);
  const [list, setList] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [showTest, setTestShow] = useState(false);
  const [mode, setMode] = useState("new");
  const [instance, setInstance] = useState({})
  const handleAdd = name => {
    addTopGroup({
      name: name,
      project_id: id
    }).then(res => {
      setGroupList([...groupList, res.item]);
    });
  }; //添加分组
  const handleDelete = groupId => {
    deleteGroup({
      id: groupId,
      projectId: id
    }).then(() => {
      setGroupList(
        groupList.filter(group => {
          return group.id !== groupId;
        })
      );
    });
  }; //删除分组
  const handleTestAdd = () => {
    setMode('new')
    setTestShow(true);
  };
  const handleEdit=(ins)=>{
    setMode('edit')
    setTestShow(true);
    setInstance(ins)
  }
  const filterCode = id => {
    setGroupId(id);
  }; //按组筛选
  useEffect(() => {
    getGroups({
      id: id
    }).then(res => {
      setGroupList(res.list);
    });
  }, [id]); //获取分组
  useEffect(() => {
    getTestInstances({
      id: id
    }).then(res => {
      setList(res.list)
    });
  }, [id]); //获取分组
  const dataList = useMemo(() => {
    if (!groupId) {
      return list;
    } else {
      return list.filter(item => {
        return item.group_id === groupId;
      });
    }
  }, [list, groupId]);
  const columnConfig = [
    {
      title: "用例名称",
      dataIndex: "name"
    },
    {
      title: "最近测试结果",
      dataIndex: "result",
      render: v => <>{format(v)}</>
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      render: v => <>{format(v)}</>
    },
    {
      title: "操作",
      render(item) {
        return (
          <>
            <Button type="primary" className="right-10" onClick={()=>handleEdit(item)}>
              编辑
            </Button>
            <Button type="danger">删除</Button>
          </>
        );
      }
    }
  ];
  
  return (
    <div className="api-status-document flex height-full">
      {!showTest ? (
        <>
          <GeneralGroup
            list={groupList}
            add={handleAdd}
            delete={handleDelete}
            itemClick={filterCode}
          />
          <GeneralList createTitle="新建" add={handleTestAdd}>
            <Table dataSource={dataList} columns={columnConfig} rowKey="id" />
          </GeneralList>
        </>
      ) : (
        <ApiCreate mode={mode} group={groupList} id={id} instance={instance} hide={()=>setTestShow(false)}/>
      )}
    </div>
  );
}
