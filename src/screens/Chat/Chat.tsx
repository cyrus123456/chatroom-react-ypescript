import React from 'react';
import { Row, Col, List, Avatar, Input, Tooltip, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
export default function Chat() {
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  return <>
    <Row>
      <Col flex="300px">
        <List
          itemLayout="horizontal"
          dataSource={data}
          style={{ padding: '0 20px 0 20px' }}
          header={
            <Row>
              <Col flex="auto">
                <Input placeholder="搜索" prefix={<SearchOutlined />} />
              </Col>
              <Col flex="32px">
                <Tooltip title="群聊">
                  <Button icon={<PlusOutlined />} />
                </Tooltip>
              </Col>
            </Row>
          }
          renderItem={item => (
            <List.Item
              style={{ borderBottomColor: '#dddddd' }}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<span >{item.title}</span>}
                description="最新聊天内容"
              />
            </List.Item>
          )}
        />
      </Col>
      <Col flex="auto">Fill Rest</Col>
    </Row>
  </>;
}
