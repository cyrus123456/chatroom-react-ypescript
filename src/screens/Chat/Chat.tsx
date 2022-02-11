import React, { useState } from 'react';
import './Chat.css'
import { Row, Col, List, Avatar, Input, Tooltip, Button } from 'antd';
import { SearchOutlined, PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';
const { TextArea } = Input;
export default function Chat() {
  const data = [
    {
      title: 'Ant Design Title 1',
      sender: true
    },
    {
      title: 'Ant Design Title 2',
      sender: false
    },
    {
      title: 'Ant Design Title 3',
      sender: true
    },
    {
      title: 'Ant Design Title 4',
      sender: false
    },
    {
      title: 'Ant Design Title 5',
      sender: true
    },
    {
      title: 'Ant Design Title 6',
      sender: false
    },
    {
      title: 'Ant Design Title 7',
      sender: true
    },
    {
      title: 'Ant Design Title 8',
      sender: false
    },
    {
      title: 'Ant Design Title 9',
      sender: true
    },
    {
      title: 'Ant Design Title 10',
      sender: false
    },
    {
      title: 'Ant Design Title 11',
      sender: true
    },
    {
      title: 'Ant Design Title 12',
      sender: false
    },
    {
      title: 'Ant Design Title 13',
      sender: true
    },
    {
      title: 'Ant Design Title 14',
      sender: false
    },
    {
      title: 'Ant Design Title 15',
      sender: true
    },
    {
      title: 'Ant Design Title 16',
      sender: false
    },
  ];
  const [ActiveCheckedChat, setActiveCheckedChat] = useState(data[0].title);
  return <>
    <Row>
      <Col flex="300px"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Row align='middle' style={{ height: "57px", padding: '0 20px 0 20px' }} >
          <Col flex="auto">
            <Input placeholder="搜索" prefix={<SearchOutlined />} />
          </Col>
          <Col flex="32px">
            <Tooltip title="添加好友">
              <Button icon={<PlusOutlined />} />
            </Tooltip>
          </Col>
        </Row>
        <div
          style={{
            flex: "1",
            marginRight: "3px",
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item
                className={ActiveCheckedChat === item.title ? "ActiveBackground" : ""}
                style={{ borderBottomColor: '#dddddd', paddingLeft: '20px' }}
                onClick={() => { setActiveCheckedChat(item.title) }}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<span >{item.title}</span>}
                  description="最新聊天内容"
                />
              </List.Item>
            )}
          />
        </div>
      </Col>
      <Col style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        borderLeft: "solid 1px #dddddd",
        backgroundColor: "#fdfdfd"
      }} flex="auto">
        <Row
          justify='space-between'
          align="middle"
          style={{ height: "57px", borderBottom: "solid 1px #dddddd", padding: "10px" }}
        >
          <span style={{ fontSize: "large", fontWeight: "bold" }}>王王</span>
          <Tooltip title="发起群聊">
            <Button icon={<UsergroupAddOutlined />} />
          </Tooltip>
        </Row>
        <div style={{ flex: "1", overflowY: "scroll", overflowX: "hidden", marginRight: "3px", }}>
          <List
            dataSource={data}
            style={{ padding: '0 20px 0 20px' }}
            renderItem={item => (
              <Row justify={item.sender ? 'end' : 'start'} align='middle' >
                <span
                  style={{
                    backgroundColor: item.sender ? "#cce4fc" : "#f0f2f5",
                    padding: "5px",
                    color: "#000000",
                    margin: "10px 0 10px 0"
                  }}
                >
                  {item.title}
                </span>
              </Row >
            )}
          />
        </div>
        <div style={{ height: "200px", borderTop: "solid 1px #dddddd", padding: "15px 3px 15px 15px" }}>
          <TextArea style={{ resize: "none" }} rows={6} bordered={false} />
          <Row justify='end' >
            <Button type="link">发送(S)</Button>
          </Row>
        </div>
      </Col>
    </Row >
  </>;
}
