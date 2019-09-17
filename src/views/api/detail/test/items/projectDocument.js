import React, { useEffect, useState, useMemo } from "react";
import { Table, Button } from "antd";
import { addTopGroup, getGroups, deleteGroup } from "api/testGroup";
import { GeneralGroup, GeneralList } from "@/components";
import {
  getProjectDocuments,
  deleteProjectDocument
} from "api/projectDocument";
import format from "until/format";
import ApiCreate from "./apiDocument/apiCreate";
import { SimpleModal } from "components";
import { Input, Select } from "antd";
import { useInputChange } from 'hooks/useInputChange';
import { useSelectChange } from 'hooks/useSelectValue'
const {Option}=Select
export default function ProjectDocument(props) {
  const id = props.search.split("=")[1];
  const [groupList, setGroupList] = useState([]);
  const [type, setType] = useState("entry");
  const [list, setList] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [curDoc, setCurDoc] = useState(null);
  const [showTest, setTestShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [mode, setMode] = useState('new')
  const name=useInputChange('')
  const des=useInputChange('')
  const group=useSelectChange('')
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
    setTestShow(true);
  };
  const handleInstanceAdd = () => {
    setModalShow(true);
  };
  
  const modifyDocument = item => {
    setType("edit");
    setCurDoc(item);
  }; //修改文档
  const handleStatusDelete = projectId => {
    deleteProjectDocument({
      id: projectId
    }).then(() => {
      const filterList = list.filter(item => {
        return item.id !== projectId;
      });
      setList([...filterList]);
    });
  }; //删除文档
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
    if (type !== "entry") return;
    getProjectDocuments({
      id: id
    }).then(res => {
      setList(res.list);
    });
  }, [id, type, groupList.length]); //获取文档
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
      title: "类型",
      dataIndex: "type",
      render: v => <>{format(v)}</>
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
            <Button
              type="primary"
              className="right-10"
              onClick={() => modifyDocument(item)}
            >
              测试
            </Button>
            <Button type="danger" onClick={() => handleStatusDelete(item.id)}>
              删除
            </Button>
          </>
        );
      }
    }
  ];
  const groupSelect = useMemo(() => {
    return groupList.map(gr => {
      return (
        <Option value={gr.id} key={gr.id}>
          {gr.name}
        </Option>
      )
    })
  }, [groupList])
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
        <ApiCreate mode='new'/>
      )}
      <SimpleModal
        modalShow={modalShow}
        hide={() => setModalShow(false)}
        onOk={handleInstanceAdd}
        simple={false}
        title={mode === "new" ? "新建一个用例" : "修改用例"}
      >
        <>
          <label className="block bottom-10 top-10">用例名称</label>
          <Input {...name} />
          <label className="block bottom-10">选择分组</label>
          <Select
            className="width-full"
            {...group}
          >
            {<Option value={0}>默认分组</Option>}
            {groupSelect}
          </Select>

          <label className="block bottom-10 top-10">描述</label>
          <Input {...des} />
        </>
      </SimpleModal>
    </div>
  );
}
