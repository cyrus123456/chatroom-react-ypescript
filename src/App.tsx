import React from 'react';
import appStyle from './App.module.css';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { MessageFilled, ProfileFilled, MehFilled } from '@ant-design/icons'
import { Menu, Layout } from 'antd';
import Login from './screens/Login/Login';
import Chat from './screens/Chat/Chat';
import User from './screens/User/User';
import Contact from './screens/Contact/Contact';
const { Content, Sider } = Layout;

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const setRouteActive = (e: any) => {
    navigate(e.key);
  }
  const tabs = [
    {
      key: '/Chat',
      title: '消息',
      icon: <MessageFilled />,
    },
    {
      key: '/Contact',
      title: '联系人',
      icon: <ProfileFilled />,
    },
    {
      key: '/User',
      title: '我',
      icon: <MehFilled />,
    },
  ]

  return (
    <Layout hasSider>
      {
        (pathname === '/') ? null :
          <Sider
            collapsed={true}
            className={appStyle.leftSide}
          >
            <Menu
              activeKey={pathname} inlineCollapsed={true}
              onClick={setRouteActive} mode="inline" theme="dark"
            >
              {tabs.map(item => (
                <Menu.Item key={item.key} icon={item.icon} title={item.title} />
              ))}
            </Menu>
          </Sider>
      }
      <Content>
        <Routes>
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/User" element={<User />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
