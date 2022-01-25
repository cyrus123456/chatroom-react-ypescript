import React from 'react'
import { Form, Input, NavBar, Button, Dialog } from 'antd-mobile'
import { login, tokenVerify,tokenRefresh } from '../../netWork/request'

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
    Dialog.alert({
      content: JSON.stringify(loginFormData),
    })
  }
  const onClickTokenVerify = () => {
    tokenVerify()
  }
  const onClickTokenRefresh = () => {
    tokenRefresh()
  }
  return (
    <>
      <NavBar backArrow={false} >登陆</NavBar>
      <Form
        form={loginForm}
        mode="card"
        layout='horizontal'
        footer={
          <Button
            block
            type='submit'
            onClick={onSubmit}
            color='primary'
            size='large'>
            登陆
          </Button>
        }
      >
        <Form.Item
          name="UserID"
          label="账号"
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input placeholder='请输入账号' ></Input>
        </Form.Item>
        <Form.Item
          name="UserPwd"
          label="密码"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input placeholder='请输入密码' ></Input>
        </Form.Item>
      </Form>
      <div style={{ margin: "1rem" }} >
        <Button
          onClick={onClickTokenVerify}
          block
          color='default'
          size='large'>
          注册(临时token验证)
        </Button>
      </div>
      <div style={{ margin: "1rem" }} >
        <Button
          onClick={onClickTokenRefresh}
          block
          color='default'
          size='large'>
          续签token
        </Button>
      </div>
    </>
  )
}
