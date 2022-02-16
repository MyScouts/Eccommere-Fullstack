import { Button, Card, Checkbox, Divider, Form, Input, message, Row, Space } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AuthLayout from '../layouts/auth/AuthLayout'
import { adminLoginService, registerService } from '../services/authService'


const RegisterIndex = () => {
    const router = useRouter()
    const onFinish = async (values: any) => {
        message.loading({ content: 'Loading...', key: 'loading', });
        const result = await registerService(values) as number
        message.destroy()
        if (result === 200) {
            router.push('/')
            message.success({ content: 'Register is successfully!', key: 'success', duration: 2 });
            return;
        } else if (result === 301) {
            message.error({ content: 'Email is exist!', key: 'error', duration: 2 });
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
                            <Title level={2} strong={true} style={{ lineHeight: "0px" }}>Register System</Title>
                            <Text>Wellcome you to the system!</Text>
                        </Space>
                    </Space>
                    <Divider />

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        // wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            labelAlign='left'
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please input your first name!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelAlign='left'
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please input your last name!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelAlign='left'
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                },
                                {
                                    type: 'email',
                                    message: 'Please input a valid email address!'
                                }
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelAlign='left'
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }, {
                                    pattern: /^[0-9]{10}$/,
                                    message: 'Please input a valid phone number!'
                                }
                            ]}>
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

                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                        <Link href={'/login'}>I have an account, login now!</Link>
                    </Space>
                </Card>
            </div>
        </Row>
    )
}

RegisterIndex.layout = AuthLayout
export default RegisterIndex
