import React from 'react'
import { Link } from 'react-router-dom'
export default function TestHeader(props) {
  return (
    <>
      <div className='manage-header'>
        <Link to='/home/api/test'>API自动化测试</Link>
        <span>>{props.name}>{props.curMenu}</span>
      </div>
    </>
  )
}
