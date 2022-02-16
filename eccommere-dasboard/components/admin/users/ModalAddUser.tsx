import { Form, Input, message, Modal } from 'antd'
import { useRouter } from 'next/router';
import React from 'react'
import { createUserService, registerService } from '../../../services/authService';

interface IProps {
    isModalVisible: boolean
    handleOkCallback: () => void,
    setIsModalVisible: (isModalVisible: boolean) => void
}
const ModalAddUser = (props: IProps) => {
    const router = useRouter()
    const [form] = Form.useForm();
    const handleOk = () => {
        form.validateFields()
            .then(async (values) => {
                message.loading({ content: 'Loading...', key: 'loading', });
                const result = await createUserService(values) as number
                message.destroy()
                if (result === 200) {
                    router.reload()
                    message.success({ content: 'Register is successfully!', key: 'success', duration: 2 });
                    props.setIsModalVisible(false)
                    return;
                } else if (result === 301) {
                    message.error({ content: 'Email is exist!', key: 'error', duration: 2 });
                } else if (result === 302) {
                    message.error({ content: 'Your account is deleted!', key: 'error', duration: 2 });
                } else if (result === 303) {
                    message.error({ content: 'Your account is admin type!', key: 'error', duration: 2 });
                } else {
                    message.error({ content: 'Login Failed, Please check your input!', key: 'error', duration: 2 });
                }
                props.handleOkCallback()

            })
            .catch((errorInfo) => {
                message.error({ content: 'Check your input!', key: 'error', duration: 2 });
            });

    };

    const handleCancel = () => {
        form.resetFields();
        props.setIsModalVisible(false)
    }

    return (
        <Modal title="New Users" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                // wrapperCol={{ span: 16 }}
                autoComplete="off"
                form={form}
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
            </Form>
        </Modal>
    )
}

export default ModalAddUser