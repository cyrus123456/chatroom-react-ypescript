import React from 'react';
import appStyle from './App.module.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { MessageFilled, ProfileFilled, MehFilled } from '@ant-design/icons'
import { Menu, Layout } from 'antd';
import Chat from './screens/Chat/Chat';
import User from './screens/User/User';
import Contact from './screens/Contact/Contact';
const { Content, Sider } = Layout;

function App() {
  const navigate = useNavigate()
  const setRouteActive = (e: any) => {
    navigate(e.key);
  }
  const tabs = [
    {
      key: '/index/Chat',
      title: '消息',
      icon: <MessageFilled />,
    },
    {
      key: '/index/Contact',
      title: '联系人',
      icon: <ProfileFilled />,
    },
    {
      key: '/index/User',
      title: '我',
      icon: <MehFilled />,
    },
  ]

  return (
    <Layout hasSider>
      <Sider
        collapsed={true}
        className={appStyle.leftSide}
      >
        <Menu
          inlineCollapsed={true}
          onClick={setRouteActive} mode="inline" theme="dark"
        >
          {tabs.map(item => (
            <Menu.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </Menu>
      </Sider>
      <Content>
        <Routes>
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App;
