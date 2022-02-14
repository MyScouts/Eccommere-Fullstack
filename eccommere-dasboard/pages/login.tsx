import { Button, Card, Checkbox, Divider, Form, Input, message, Row, Space } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AuthLayout from '../layouts/auth/AuthLayout'
import { adminLoginService } from '../services/authService'


const LoginIndex = () => {
    const router = useRouter()
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        message.loading({ content: 'Loading...', key: 'loading', });
        const result = await adminLoginService(values) as number
        message.destroy()
        if (result === 201) {
            router.push('admin/dashboard')
            message.success({ content: 'Login Success Admin Dasboard', key: 'success', duration: 2 });
            return;

        } else if (result === 200) {
            router.push('/')
            message.success({ content: 'Login Success For User Usign', key: 'success', duration: 2 });
            return;
        } else if (result === 301) {
            message.error({ content: 'Password not match!', key: 'error', duration: 2 });
            return;
        } else if (result === 302) {
            message.error({ content: 'Your account is deleted!', key: 'error', duration: 2 });
            return;
        } else if (result === 303) {
            message.error({ content: 'Your account is admin type!', key: 'error', duration: 2 });
            return;
        } else {
            message.error({ content: 'Login Failed, Please check your input!', key: 'error', duration: 2 });
            return;
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }} className="login-page">
            <div className="body-wrapper" style={{ width: "40%" }}>
                <Card bordered={true} className="login-form" style={{ width: "100%" }}>
                    <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                        <Space direction="vertical" style={{ width: '100%', justifyContent: 'center' }}>
                            <Title level={2} strong={true} style={{ lineHeight: "0px" }}>Login System</Title>
                            <Text>Wellcome you to the system!</Text>
                        </Space>
                    </Space>
                    <Divider />

                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        // wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            labelAlign='left'
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }, { type: 'email', message: 'Please input a valid email address!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelAlign='left'
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                        <Link href={'/register'}>I dont't an account, sign up now!</Link>
                    </Space>
                </Card>
            </div>
        </Row>
    )
}

LoginIndex.layout = AuthLayout
export default LoginIndex
