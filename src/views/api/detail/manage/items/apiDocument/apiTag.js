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
export function ProtocolTag(props) {
  const protocol = props.protocol || ''
  const info = useMemo(() => {
    switch (protocol) {
      case 'Http://':
        return {
          protocol: 'HTTP',
          color: '#607d8b'
        }
      case 'Https://':
        return {
          protocol: 'HTTPS',
          color: '#82939f'
        }

      default:
        return {
          protocol: 'HTTPS',
          color: '#82939f'
        }
    }
  }, [protocol])
  return <Tag color={info.color}>{info.protocol.toUpperCase()}</Tag>
}
