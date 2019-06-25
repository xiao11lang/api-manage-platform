import React from "react";
import { Button, Input, Card, Switch ,Select} from "antd";
const {Option}=Select
export function TeamManage() {
  return (
    <div className="work-team-manage">
      <Card>
        <div className="title">
          <div className='card-title'>工作组名称</div>
          <Input style={{marginBottom:10}}/>
          <Button type='primary' >保存</Button>
        </div>
      </Card>
      <Card>
        <div className='card-title'>默认选项</div>
        <Card className='default-option'>
          <span>新成员加入空间之后自动绑定所有产品</span>
          <Switch />
        </Card>
        <Card className='default-option'>
          <div>新成员绑定到产品后，自动将该成员设置为该产品内所有项目的某个权限角色</div>
          <Select defaultValue='none' style={{width:200,marginTop:10}}>
            <Option value='none'>不设置</Option>
            <Option value='admin'>设置为管理员</Option>
            <Option value='read'>设置为只读成员</Option>
            <Option value='read_write'>设置为读写成员 </Option>
          </Select>
        </Card>
      </Card>
      <Card>
        <div className='card-title'>转让工作组</div>
        <div>当您不再需要对工作空间进行管理时，您可以将工作空间转让给空间内的另一位成员。</div>
        <div>转让空间之后，您将失去该空间的管理权限并退出当前的工作空间，这意味着您在被重新加入该工作空间之前无法看到该工作空间。这是一个不可恢复的操作，请谨慎对待！</div>
        <Button type='primary' style={{marginTop:10}}>转让工作组</Button>
      </Card>
      <Card>
        <div className='card-title'>删除工作组</div>
        <div>一旦删除了空间，空间内所有项目、权限、成员，项目中所有内容等都将会被永久删除。并且您的付费记录也会被永久删除，剩余的使用期限无法转移或者赎回。</div>
        <div>这是一个不可恢复的操作，请谨慎对待！</div>
        <Button type='danger' style={{marginTop:10}}>删除工作组</Button>
      </Card>
    </div>
  );
}
