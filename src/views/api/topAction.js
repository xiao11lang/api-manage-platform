import React, { useState } from 'react'
import { Button, Input, Select } from 'antd'
import IconFont from './../../components/iconfont'
const Group = Input.Group
const Search = Input.Search
const { Option } = Select
export function TopAction(props) {
  const [actionShow, setActionShow] = useState(false)
  return (
    <>
      <p>API研发管理</p>
      <div className="api-top">
        {!actionShow ? (
          <div className="left-top">
            <Button type="primary" icon="plus">
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
    </>
  )
}
