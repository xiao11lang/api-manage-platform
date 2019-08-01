import React from 'react'
import { Link } from 'react-router-dom'
export default function ManageHeader(props) {
  return (
    <>
      <div className='manage-header'>
        <Link to='/home/api/manage'>接口管理</Link>
        <span>>{props.name}>项目概况</span>
      </div>
    </>
  )
}
