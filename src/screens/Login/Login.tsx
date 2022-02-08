import React from 'react'
import LoginStyle from './Login.module.css'
import { Form, Input, Button, Checkbox, Modal, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, tokenVerify, tokenRefresh } from '../../netWork/request'

export default function Login() {
  const [loginForm] = Form.useForm()
  const onSubmit = () => {
    const loginFormData = loginForm.getFieldsValue()
    let nextFlag = false
    for (const key in loginFormData) {
      if (!loginFormData[key]) { nextFlag = true }
    }
    if (nextFlag) { return }
    login(loginFormData)
    Modal.info({
      title: '表单详情',
      content: JSON.stringify(loginFormData),
      onOk() { },
    });
  }
  const onClickTokenVerify = () => {
    tokenVerify()
  }
  const onClickTokenRefresh = () => {
    tokenRefresh()
  }
  return (
    <Row justify="space-around" align="top" style={{ height: "100vh", backgroundColor: "#ececec" }} >
      <Form
        style={{ width: "350px", marginTop: "20vh", padding: "30px", backgroundColor: "#ffffff", borderRadius: "10px" }}
        name="loginForm"
        form={loginForm}
        layout='horizontal'
      >
        <Form.Item
          name="UserID"
          label="账号"
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入账号' ></Input>
        </Form.Item>

        <Form.Item
          name="UserPwd"
          label="密码"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入密码' ></Input>
        </Form.Item>
        <Row justify="space-between" align="middle" >
          <Form.Item name="Remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => { console.log("忘记密码") }}
              type="link"
            >
              忘记密码
            </Button>
          </Form.Item>
        </Row>
        <Form.Item>
          <Button
            block
            onClick={onSubmit}
            htmlType="submit"
            size='large'
            type="primary"
          >
            登陆
          </Button>
          Or
          <Button
            onClick={onClickTokenVerify}
            type="link"
          >
            注册(临时token验证)
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={onClickTokenRefresh}
            block
            size='large'>
            续签token
          </Button>
        </Form.Item>
      </Form>
    </Row >
  )
}
