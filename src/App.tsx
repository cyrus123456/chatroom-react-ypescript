import React from 'react';
import './App.css';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { TabBar } from 'antd-mobile'
import { UserContactOutline, MessageOutline, UserOutline } from 'antd-mobile-icons'
import Login from './screens/Login/Login';
import Chat from './screens/Chat/Chat';
import User from './screens/User/User';
import Contact from './screens/Contact/Contact';


function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const setRouteActive = (pathname: string) => {
    navigate(pathname);
  }
  const tabs = [
    {
      key: '/Chat',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/Contact',
      title: '联系人',
      icon: <UserContactOutline />,
    },
    {
      key: '/User',
      title: '我',
      icon: <UserOutline />,
    },
  ]
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/User" element={<User />} />
      </Routes>
      <TabBar activeKey={pathname} onChange={setRouteActive}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  );
}

export default App;
