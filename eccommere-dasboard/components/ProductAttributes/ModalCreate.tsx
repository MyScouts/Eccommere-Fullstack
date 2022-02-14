import { Button, Form, Input, message, Modal, Upload } from 'antd'
import React, { useState } from 'react'
import {
    PlusCircleOutlined,
    UploadOutlined
} from '@ant-design/icons'
import { newProductAttribute } from '../../services/productService';
import { useRouter } from 'next/router';

interface IProps {
    productId: string,
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void
}

const ModalCreate = (props: IProps) => {
    const router = useRouter()
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [form] = Form.useForm();
    const handleOk = async () => {
        form.validateFields()
            .then(async (values) => {
                const result = await newProductAttribute({
                    productId: props.productId,
                    image: avatarFile,
                    ...values
                })
                if (result === 200) {
                    message.success({ content: 'Create is successfully!', key: 'success', duration: 2 });
                    props.setIsModalVisible(false)
                    router.reload()
                    form.resetFields();
                    return
                }
                message.error({ content: 'Create is failed!', key: 'error', duration: 2 });

                // Submit values
                // submitValues(values);
            })
            .catch((errorInfo) => { });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const uploadAvatar = (file: any) => {
        setAvatarFile(file)
        form.setFieldsValue({
            avatar: file.name
        })
    }

    const handleCancel = () => {
        props.setIsModalVisible(false)
    }

    return (
        <div>
            <Modal title="New Attribute" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        labelAlign='left'
                        label="Avatar"
                        name="avatar"
                        rules={[{ required: true, message: 'Please input  avatar!' }]}>
                        <Upload beforeUpload={uploadAvatar}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        <Input hidden />
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input  title!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description!' }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalCreate
