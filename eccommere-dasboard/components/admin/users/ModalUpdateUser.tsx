import { Form, Input, message, Modal, Radio } from 'antd'
import { useRouter } from 'next/router';
import React from 'react'
import { IUserInfo } from '../../../interface/user';
import { createUserService, registerService, updateUserService } from '../../../services/authService';

interface IProps {
    isModalVisible: boolean
    handleOkCallback: (status: boolean) => void,
    setIsModalVisible: (isModalVisible: boolean) => void,
    userInfo: IUserInfo | null
}
const ModalUpdateUser = (props: IProps) => {
    const router = useRouter()
    const [form] = Form.useForm();
    const handleOk = () => {
        form.validateFields()
            .then(async (values) => {
                message.loading({ content: 'Loading...', key: 'loading', });
                const result = await updateUserService({
                    ...values,
                    userId: props.userInfo?._id
                }) as number
                message.destroy()
                if (result === 200) {
                    // router.reload()
                    message.success({ content: 'Update is successfully!', key: 'success', duration: 2 });
                    props.handleOkCallback(true)
                    props.setIsModalVisible(false)
                    return;
                } else {
                    message.error({ content: 'Update Failed, Please check your input!', key: 'error', duration: 2 });
                }

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
        <Modal title="New Users" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel} width={700}>
            {
                props.userInfo && <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    autoComplete="off"
                    form={form}
                    initialValues={{
                        firstName: props.userInfo.firstName,
                        lastName: props.userInfo.lastName,
                        email: props.userInfo.email,
                        phoneVerified: props.userInfo.phoneVerified ? "1" : "0",
                        emailVerified: props.userInfo.emailVerified ? "1" : "0",
                        phoneNumber: props.userInfo.phoneNumber,
                        roles: props.userInfo.roles,
                        address: props.userInfo.address,
                    }}
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
                    >
                        <Input disabled />
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
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            },
                        ]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Email Verification"
                        name="emailVerified"
                        labelAlign='left'
                        rules={[{ required: true, message: 'Please input your Email Verification!' }]}
                    >
                        <Radio.Group>
                            <Radio.Button value="0">No</Radio.Button>
                            <Radio.Button value="1">Yes</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Phone Verification"
                        name="phoneVerified"
                        labelAlign='left'
                        rules={[{ required: true, message: 'Please input your Phone Verification!' }]}
                    >
                        <Radio.Group>
                            <Radio.Button value="0">No</Radio.Button>
                            <Radio.Button value="1">Yes</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Roles"
                        name="roles"
                        labelAlign='left'
                        rules={[{ required: true, message: 'Please input your roles!' }]}
                    >
                        <Radio.Group>
                            <Radio.Button value="user">User</Radio.Button>
                            <Radio.Button value="admin">Admin</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    {/* <Form.Item
                        labelAlign='left'
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item> */}
                </Form>
            }
        </Modal>
    )
}

export default ModalUpdateUser