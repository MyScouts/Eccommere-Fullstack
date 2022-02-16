import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, message, Row, Select, Upload } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { getUserInfoService, updateProfileService } from '../../services/userService';
import { IUserInfo } from '../../interface/user';
import DefaultLayout from '../../layouts/default/DefaultLayout';
import UserLayout from '../../layouts/user/UserLayout';
const EditProfile = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)
    const getUserInfo = async () => {
        setUserInfo(await getUserInfoService());
    }
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    useEffect(() => {
        getUserInfo();
    }, [])


    const [form] = Form.useForm();

    const uploadAvatar = (file: any) => {
        setAvatarFile(file)
        form.setFieldsValue({
            avatar: file.name
        })
    }

    const router = useRouter()
    const onFinish = async (values: any) => {
        message.loading({ content: 'Loading...', key: 'loading', });
        const result = await updateProfileService({
            ...values,
            avatar: avatarFile
        }) as number
        message.destroy()
        if (result === 200) {
            router.push('/profile')
            message.success({ content: 'Register is successfully!', key: 'success', duration: 2 });
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
        <div>
            {userInfo && <Row>
                <Col span={15}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        autoComplete="off"
                        form={form}
                        initialValues={{
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            email: userInfo.email,
                            phoneNumber: userInfo.phoneNumber,
                            address: userInfo.address,

                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            labelAlign='left'
                            label="Avatar"
                            name="avatar">
                            <Upload beforeUpload={uploadAvatar}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                            <Input hidden />
                        </Form.Item>
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
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!'
                                },
                                
                            ]}>
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            }
        </div>
    )

}

EditProfile.layout = UserLayout
export default EditProfile
