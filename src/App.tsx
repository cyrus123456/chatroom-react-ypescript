import appStyle from './App.module.css';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { MessageOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Layout, Avatar, Row } from 'antd';
import Chat from './screens/Chat/Chat';
import User from './screens/User/User';
import Contact from './screens/Contact/Contact';
const { Content, Sider } = Layout;
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const setRouteActive = (e: any) => {
    navigate(e.key);
  };
  const tabs = [
    {
      key: '/index/Chat',
      title: '消息',
      icon: <MessageOutlined />,
    },
    {
      key: '/index/Contact',
      title: '联系人',
      icon: <TeamOutlined />,
    },
    {
      key: '/index/User',
      title: '我',
      icon: <UserOutlined />,
    },
  ];
  return (
    <Layout hasSider>
      <Sider
        collapsed={true}
        className={appStyle.leftSide}
      >
        <Row style={{ height: '70px' }} justify='space-around' align='middle'>
          <Avatar size={58} src='https://joeschmoe.io/api/v1/random' />
        </Row>
        <Menu
          defaultSelectedKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
          inlineCollapsed={true}
          onClick={setRouteActive} mode='inline' theme='dark'
        >
          {tabs.map(item => (
            <Menu.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </Menu>
      </Sider>
      <Content>
        <Routes>
          <Route path='/Chat' element={<Chat />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/User' element={<User />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
