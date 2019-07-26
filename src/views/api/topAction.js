import React, { useState,useMemo,useContext } from 'react'
import { Button, Input, Select,Modal } from 'antd'
import IconFont from './../../components/iconfont'
import { ManageModal } from './modal/manageModal';
import { ApiCtx } from '../home/home'
import { TestModal } from './modal/testModal';

const Group = Input.Group
const Search = Input.Search
const { Option } = Select
export function TopAction(props) {
  const [actionShow, setActionShow] = useState(false)
  const [modalShow,setModalShow]=useState(false)
  const key = useContext(ApiCtx)
  const title=useMemo(()=>{
    return props.currentKey==='2'?'新建项目':'新建自动化测试'
  },[props.currentKey])
  const showModal=()=>{
    setModalShow(true)
  }
  const hideModal=()=>{
    setModalShow(false)
  }
  return (
    <>
      <p>{key==='2'?'API研发管理':'API自动化测试'}</p>
      <div className="api-top">
        {!actionShow ? (
          <div className="left-top">
            <Button type="primary" icon="plus" onClick={showModal}>
              新建
            </Button>
            <Button
              type="link"
              icon="appstore"
              onClick={() => setActionShow(true)}
            >
              批量操作
            </Button>
          </div>
        ) : (
          <div className="left-top">
            <Button onClick={() => setActionShow(false)} type="link">
              <IconFont type="iconfanhui" />
              返回
            </Button>
            <Button onClick={() => setActionShow(false)} type="link">
              <IconFont type="iconshanchu" />
              删除
            </Button>
            <Button onClick={() => setActionShow(false)} type="link">
              <IconFont type="iconyidong1" />
              移动
            </Button>
          </div>
        )}
        <Group compact>
          <Select defaultValue="all">
            <Option value="all">全部</Option>
            <Option value="API">API</Option>
          </Select>
          <Search placeholder="搜索" style={{ width: 200 }} />
        </Group>
      </div>
      <Modal visible={modalShow} footer={null} title={title} closable={false}>
          {key==='2'?<ManageModal hideModal={hideModal} key={key}/>:<TestModal hideModal={hideModal} key={key}/>}
      </Modal>
    </>
  )
}
