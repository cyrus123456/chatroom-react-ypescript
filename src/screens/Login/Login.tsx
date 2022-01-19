import React from 'react'
import { Form, Input, NavBar, Button, Dialog } from 'antd-mobile'
import { login } from '../../netWork/request'

export default function Login() {
  const [loginForm] = Form.useForm()
  const onSubmit = () => {
    const loginFormData = loginForm.getFieldsValue()
    let nextFlag = false
    for (const key in loginFormData) {
      if (!loginFormData[key]) { nextFlag = true }
    }
    if (nextFlag) { return }
    login(loginFormData).then()
    Dialog.alert({
      content: JSON.stringify(loginFormData),
    })
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
          onClick={() => { alert('跳转注册页面') }}
          block
          color='default'
          size='large'>
          注册
        </Button>
      </div>
    </>
  )
}
