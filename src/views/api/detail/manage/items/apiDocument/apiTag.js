import React, { useMemo } from 'react'
import { Tag } from 'antd'
export default function ApiTag(props) {
  const status = props.status
  const info = useMemo(() => {
    switch (status) {
      case 'enabled':
        return { des: '启用', color: 'green' }
      case 'maintain':
        return { des: '维护', color: 'volcano' }
      case 'deprecated':
        return { des: '弃用', color: 'gray' }
      case 'undetermined':
        return { des: '待定', color: 'orange' }
      default:
        return { des: 'BUG', color: 'red' }
    }
  }, [status])
  return <Tag color={info.color}>{info.des}</Tag>
}
export function MethodTag(props) {
  const method = props.method || ''
  const color = useMemo(() => {
    switch (method) {
      case 'head':
        return 'green'
      case 'get':
        return 'blue'
      case 'post':
        return 'gold'
      case 'put':
        return 'purple'
      case 'options':
        return 'geekblue'
      case 'delete':
        return 'red'
      default:
        return 'green'
    }
  }, [method])
  return <Tag color={color}>{method.toUpperCase()}</Tag>
}
