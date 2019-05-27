import React from 'react'
import {Row,Col} from 'antd'
export function InfoRow(props) {
    const style = props.style
      ? Object.assign({}, props.style, { paddingLeft: 20 })
      : { paddingLeft: 20 };
    return (
      <>
        <Row align="middle" type="flex" style={style}>
          <Col span={6}>
            <span>{props.label}</span>
          </Col>
          <Col span={18}>{props.children}</Col>
        </Row>
      </>
    );
  }