import React from 'react'
import { Form, Input, NavBar, Button, Dialog } from 'antd-mobile'

export default function Login() {
  const [loginForm] = Form.useForm()
  const onSubmit = () => {
    const loginFormData = loginForm.getFieldsValue()
    let nextFlag = true
    for (const key in loginFormData) {
      if (!loginFormData[key]) { nextFlag = false }
    }
    nextFlag && Dialog.alert({
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
          name="账号"
          label="账号"
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input placeholder='请输入账号' ></Input>
        </Form.Item>
        <Form.Item
          name="密码"
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
