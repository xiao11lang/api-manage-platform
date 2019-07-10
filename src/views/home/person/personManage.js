import React,{createRef} from "react";
import { Tabs, Button, Icon } from "antd";
const { TabPane } = Tabs;
export function PersonManage(props) {
    const input=createRef()
    const handleCopy=()=>{
        input.current.select()
        document.execCommand('copy')
    }
  return (
    <>
      <div className="person-manage-top">
        <h2 style={{fontWeight:'bold'}}>人员管理</h2>
        <p>
          <b>TeamId</b>
          <input className='link' readOnly defaultValue={props.teamInfo.unique_id} ref={input} style={{margin:'0 10px',width:350,border:'none'}}/>
          <Button size='small' onClick={handleCopy}>复制</Button>
        </p>
        <div>
          <Button type="primary">
            <Icon type="plus" />邀请
          </Button>
        </div>
      </div>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="全部" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="申请" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </>
  );
}
