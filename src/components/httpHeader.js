import { Menu } from 'antd'
import React from 'react'
import { httpHeader } from '../until/constant'
export default function HttpHeader(props) {
  const handleClick = ({ key }) => {
    props.onClick(key)
  }
  const items = httpHeader.map(header => {
    return <Menu.Item key={header}>{header}</Menu.Item>
  })
  return (
    <Menu style={{ height: 300, overflowY: 'scroll' }} onClick={handleClick}>
      {items}
    </Menu>
  )
}
