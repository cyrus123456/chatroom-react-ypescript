import { useState, useEffect } from 'react';
import './Chat.css';
import { Row, Col, List, Avatar, Input, Tooltip, Button } from 'antd';
import { SearchOutlined, PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { refreshChatList } from '../../netWork/request';
import { getCookie } from '../../utils/cookies'
import jwt_decode from 'jwt-decode';
const { TextArea } = Input;
let ws: WebSocket;
let jwtuid: string

export default function Chat() {
  useEffect(() => {
    interface MyToken {
      UserID: string,
      exp: number
    }
    jwtuid = jwt_decode<MyToken>(getCookie('reactToken')).UserID
    refreshChatList({
      uid: jwtuid
    }).then((res: any) => {
      setUsersChatroom(res.data.UsersChatroomDb)
      setChatrooms(res.data.ChatroomDb)
      setActiveCheckedChat(chatrooms[ActiveCheckedChat][0])
    })
    ws = new WebSocket('ws://localhost:9876/socket');
    ws.onopen = () => {
      console.log('Successfully WebSocket Connected');
      ws.send(JSON.stringify({
        TimeStamp: '',
        Sender: jwtuid,
        MessageRecipientId: [],
        ChatRoomId: '',
        MessageTextContent: '通知服务器缓存链接',
      }));
    };
    ws.onerror = error => {
      console.log('Socket Error: ', error);
    };
    ws.onmessage = msg => {
      console.log('WebSocket收到的消息', msg);
    };
    ws.onclose = event => {
      // 关闭时的处理操作
      const tempWs: WebSocket = ws; // 保存ws对象
      // if(new Date().getTime() - reconnect >= 10000) { // 10秒中重连，连不上就不连了
        // ws.close();
      // } else {
        ws = new WebSocket('ws://localhost:9876/socket');
        ws.onopen = tempWs.onopen;
        ws.onmessage = tempWs.onmessage;
        ws.onerror = tempWs.onerror;
        ws.onclose = tempWs.onclose;
        // ws.keepalive = tempWs.keepalive;
        // ws.last_health_time = -1;
      // }
    }
    return () => {
      ws.close();
    };
  }, []);
  const [chatrooms, setChatrooms] = useState<{ [Key: string]: any[] }>({ '': [] });
  const [usersChatrooms, setUsersChatroom] = useState<any[]>([]);
  const [ActiveCheckedChat, setActiveCheckedChat] = useState('');
  const [valueTextArea, setValueTextArea] = useState('');
  const sendMessages = () => {
    ws.send(JSON.stringify({
      TimeStamp: '',
      Sender: jwtuid,
      MessageRecipientId: ActiveCheckedChat.split('_').filter(item => item !== jwtuid),
      ChatRoomId: ActiveCheckedChat,
      MessageTextContent: valueTextArea,
    }));
  }
  return <>
    <Row>
      <Col flex='300px'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Row align='middle' style={{ height: '57px', padding: '0 20px 0 20px' }} >
          <Col flex='auto'>
            <Input placeholder='搜索' prefix={<SearchOutlined />} />
          </Col>
          <Col flex='32px'>
            <Tooltip title='添加好友'>
              <Button icon={<PlusOutlined />} />
            </Tooltip>
          </Col>
        </Row>
        <div
          style={{
            flex: '1',
            overflowY: 'scroll',
            overflowX: 'hidden',
            cursor: 'pointer'
          }}
        >
          <List
            itemLayout='horizontal'
            dataSource={usersChatrooms}
            renderItem={item => (
              <List.Item
                className={ActiveCheckedChat === item.title ? 'ActiveBackground' : ''}
                style={{ borderBottomColor: '#dddddd', paddingLeft: '20px' }}
                onClick={() => { setActiveCheckedChat(item.title); }}
              >
                <List.Item.Meta
                  avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                  title={<span >{item.title}</span>}
                  description='最新聊天内容'
                />
              </List.Item>
            )}
          />
        </div>
      </Col>
      <Col style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        borderLeft: 'solid 1px #dddddd',
        backgroundColor: '#fdfdfd'
      }} flex='auto'>
        <Row
          justify='space-between'
          align='middle'
          style={{ height: '57px', borderBottom: 'solid 1px #dddddd', padding: '10px' }}
        >
          <span style={{ fontSize: 'large', fontWeight: 'bold' }}>王王</span>
          <Tooltip title='发起群聊'>
            <Button icon={<UsergroupAddOutlined />} />
          </Tooltip>
        </Row>
        <div style={{ flex: '1', overflowY: 'scroll', overflowX: 'hidden' }}>
          <List
            dataSource={chatrooms[ActiveCheckedChat]}
            style={{ padding: '0 20px 0 20px' }}
            renderItem={item => (
              <Row justify={item.sender === jwtuid ? 'end' : 'start'} align='middle' >
                <span
                  style={{
                    backgroundColor: item.sender ? '#cce4fc' : '#f0f2f5',
                    padding: '5px',
                    color: '#000000',
                    margin: '10px 0 10px 0'
                  }}
                >
                  {item.sender === jwtuid ? `${item.messageTextContent}-${item.timeStamp}` : `${item.timeStamp}-${item.messageTextContent}`}
                </span>
              </Row >
            )}
          />
        </div>
        <div style={{ height: '200px', borderTop: 'solid 1px #dddddd', padding: '15px 3px 15px 15px' }}>
          <TextArea
            onPressEnter={sendMessages}
            onChange={(e) => { setValueTextArea(e.target.value) }}
            style={{ resize: 'none' }}
            rows={6}
            bordered={false}
          />
          <Row justify='end' >
            <Button type='link' onClick={sendMessages} >发送(S)</Button>
          </Row>
        </div>
      </Col>
    </Row >
  </>;
}
