import React from "react";
import { Input, Select, Button } from "antd";
import { addProject } from "../../../api/apiProject";
import { useInputChange } from "../../../hooks/useInputChange";
import { useSelectChange } from "../../../hooks/useSelectValue";
import format from "../../../until/format";
const { Option } = Select;
export function ManageModal(props) {
  let n,v,t;
  let info=props.info
  if(info){
    n=info.name;
    v=info.version
    t=info.type
  }
  const name = useInputChange(n || "");
  const version = useInputChange(v || "");
  const type = useSelectChange(t || "web");
  const handleAdd = () => {
    addProject({
      name: name.value,
      version: version.value,
      type: type.value,
      teamId: props.id
    }).then(res => {
      props.hideModal();
      props.dispatch({
        type: "ADD",
        item: {
          ...res.item,
          key: res.item.id,
          updatedAt: format(res.item.updatedAt)
        }
      });
    });
  };
  return (
    <>
      <div>
        <label>项目名称</label>
        <Input {...name} />
      </div>
      <div>
        <label>版本号</label>
        <Input {...version} />
      </div>
      <div>
        <label>项目类型</label>
        <Select defaultValue="web" style={{ display: "block" }} {...type}>
          <Option value="web">WEB</Option>
          <Option value="app">App</Option>
          <Option value="pc">PC</Option>
        </Select>
      </div>
      <div className="manage-modal-footer">
        <Button className="right-10" onClick={props.hideModal}>
          取消
        </Button>
        <Button type="primary" onClick={handleAdd}>
          确认
        </Button>
      </div>
    </>
  );
}
